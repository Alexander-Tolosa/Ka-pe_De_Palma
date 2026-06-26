package com.cafe.controllers;

import com.cafe.models.Booking;
import com.cafe.models.MenuItem;
import com.cafe.services.CafeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.lang.NonNull;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CafeController {

    private final CafeService cafeService;

    @Autowired
    public CafeController(CafeService cafeService) {
        this.cafeService = cafeService;
    }

    // --- MENU ENDPOINTS ---

    @GetMapping("/menu")
    public List<MenuItem> getAllMenuItems(@RequestParam(required = false) String category) {
        if (category != null && !category.trim().isEmpty()) {
            return cafeService.getMenuItemsByCategory(category);
        }
        return cafeService.getAllMenuItems();
    }

    @PostMapping("/menu")
    public ResponseEntity<MenuItem> createMenuItem(@RequestBody @NonNull MenuItem menuItem) {
        MenuItem saved = cafeService.saveMenuItem(menuItem);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/menu/{id}")
    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable @NonNull Long id, @RequestBody @NonNull MenuItem menuItem) {
        return cafeService.updateMenuItem(id, menuItem)
                .map(item -> new ResponseEntity<>(item, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/menu/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable @NonNull Long id) {
        if (cafeService.deleteMenuItem(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // --- BOOKING ENDPOINTS ---

    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return cafeService.getAllBookings();
    }

    @PostMapping("/bookings")
    public ResponseEntity<?> createBooking(@RequestBody @NonNull Booking booking) {
        try {
            Booking saved = cafeService.createBooking(booking);
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(Map.of("error", e.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(Map.of("error", e.getMessage()), HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("error", "An internal error occurred: " + e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/bookings/{id}/status")
    public ResponseEntity<?> updateBookingStatus(@PathVariable @NonNull Long id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        if (status == null) {
            return new ResponseEntity<>(Map.of("error", "Status field is required"), HttpStatus.BAD_REQUEST);
        }
        try {
            return cafeService.updateBookingStatus(id, status)
                    .map(booking -> new ResponseEntity<>(booking, HttpStatus.OK))
                    .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(Map.of("error", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    // --- ANALYTICS/STATS ENDPOINTS ---

    @GetMapping("/stats")
    public Map<String, Object> getDashboardStats() {
        return cafeService.getDashboardStats();
    }
}
