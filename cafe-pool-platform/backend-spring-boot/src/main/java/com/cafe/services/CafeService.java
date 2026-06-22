package com.cafe.services;

import com.cafe.models.Booking;
import com.cafe.models.MenuItem;
import com.cafe.repositories.BookingRepository;
import com.cafe.repositories.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CafeService {

    private final MenuItemRepository menuItemRepository;
    private final BookingRepository bookingRepository;

    private static final int MAX_BOOKINGS_PER_SLOT = 5;
    private static final double PRICE_PER_GUEST = 15.0;

    @Autowired
    public CafeService(MenuItemRepository menuItemRepository, BookingRepository bookingRepository) {
        this.menuItemRepository = menuItemRepository;
        this.bookingRepository = bookingRepository;
    }

    // --- MENU METHODS ---

    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    public List<MenuItem> getMenuItemsByCategory(String category) {
        return menuItemRepository.findByCategory(category);
    }

    public MenuItem saveMenuItem(MenuItem menuItem) {
        return menuItemRepository.save(menuItem);
    }

    public Optional<MenuItem> updateMenuItem(Long id, MenuItem itemDetails) {
        return menuItemRepository.findById(id).map(existingItem -> {
            existingItem.setName(itemDetails.getName());
            existingItem.setDescription(itemDetails.getDescription());
            existingItem.setPrice(itemDetails.getPrice());
            existingItem.setCategory(itemDetails.getCategory());
            existingItem.setImageUrl(itemDetails.getImageUrl());
            existingItem.setAvailable(itemDetails.isAvailable());
            return menuItemRepository.save(existingItem);
        });
    }

    public boolean deleteMenuItem(Long id) {
        return menuItemRepository.findById(id).map(item -> {
            menuItemRepository.delete(item);
            return true;
        }).orElse(false);
    }

    // --- BOOKING METHODS ---

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public synchronized Booking createBooking(Booking booking) {
        // Validation: Date must be present and in the future/today
        if (booking.getBookingDate() == null || booking.getBookingDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Booking date must be today or in the future.");
        }

        // Validation: Slot must be valid
        String slot = booking.getTimeSlot();
        if (slot == null || (!slot.equalsIgnoreCase("Morning") && !slot.equalsIgnoreCase("Afternoon") && !slot.equalsIgnoreCase("Evening"))) {
            throw new IllegalArgumentException("Invalid time slot. Choose Morning, Afternoon, or Evening.");
        }

        // Capacity check
        List<Booking> activeBookings = bookingRepository.findByBookingDateAndTimeSlot(booking.getBookingDate(), booking.getTimeSlot());
        long activeCount = activeBookings.stream()
                .filter(b -> !b.getStatus().equalsIgnoreCase("CANCELLED"))
                .count();

        if (activeCount >= MAX_BOOKINGS_PER_SLOT) {
            throw new IllegalStateException("The selected time slot is fully booked for this date.");
        }

        // Pricing calculation
        if (booking.getGuestCount() == null || booking.getGuestCount() <= 0) {
            throw new IllegalArgumentException("Guest count must be greater than zero.");
        }
        booking.setTotalPrice(booking.getGuestCount() * PRICE_PER_GUEST);
        booking.setStatus("PENDING");

        return bookingRepository.save(booking);
    }

    public Optional<Booking> updateBookingStatus(Long id, String status) {
        return bookingRepository.findById(id).map(existingBooking -> {
            String cleanStatus = status.trim().toUpperCase();
            if (cleanStatus.equals("PENDING") || cleanStatus.equals("APPROVED") || cleanStatus.equals("CANCELLED")) {
                existingBooking.setStatus(cleanStatus);
                return bookingRepository.save(existingBooking);
            } else {
                throw new IllegalArgumentException("Invalid booking status: " + status);
            }
        });
    }

    // --- ANALYTICS/STATS METHODS ---

    public Map<String, Object> getDashboardStats() {
        List<Booking> bookings = bookingRepository.findAll();
        double totalRevenue = bookings.stream()
                .filter(b -> b.getStatus().equalsIgnoreCase("APPROVED"))
                .mapToDouble(Booking::getTotalPrice)
                .sum();

        long pendingCount = bookings.stream().filter(b -> b.getStatus().equalsIgnoreCase("PENDING")).count();
        long approvedCount = bookings.stream().filter(b -> b.getStatus().equalsIgnoreCase("APPROVED")).count();
        long cancelledCount = bookings.stream().filter(b -> b.getStatus().equalsIgnoreCase("CANCELLED")).count();

        int totalGuests = bookings.stream()
                .filter(b -> b.getStatus().equalsIgnoreCase("APPROVED"))
                .mapToInt(Booking::getGuestCount)
                .sum();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalBookings", bookings.size());
        stats.put("totalRevenue", totalRevenue);
        stats.put("pendingBookings", pendingCount);
        stats.put("approvedBookings", approvedCount);
        stats.put("cancelledBookings", cancelledCount);
        stats.put("approvedGuests", totalGuests);
        stats.put("maxCapacityPerSlot", MAX_BOOKINGS_PER_SLOT);
        stats.put("pricePerGuest", PRICE_PER_GUEST);

        return stats;
    }
}
