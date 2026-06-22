# Ka-pe de Palma

## 📖 Project Meaning
This platform serves as the digital storefront and operational hub for a local business that merges hospitality (cafe) with leisure (swimming pool). The goal is to establish a strong online presence that captures the relaxing vibe of the venue while providing functional utility for both customers and management.

## 🎯 Project Scope
The Minimum Viable Product (MVP) encompasses:
- **Landing Page:** High-quality imagery of the cafe and pool, location details, and operating hours.
- **Digital Menu:** A visually appealing, responsive layout showcasing food and beverage offerings.
- **Pool Reservation System:** A booking engine allowing users to select dates/times, view availability, and reserve pool access.
- **Admin Dashboard:** A secure internal portal for staff to manage bookings, update menu items, and view daily schedules.

## 💻 Tech Stack
- **Frontend:** React.js
- **Styling:** Tailwind CSS
- **Backend:** Java Spring Boot
- **Database:** Supabase / PostgreSQL
- **Deployment:** Vercel (Frontend), Render/Railway (Backend)


## 📂 Architecture & Folder Structure
```text
cafe-pool-platform/
│
├── frontend-react/                # React.js application
│   ├── public/                    # Static assets
│   ├── src/
│   │   ├── assets/                # Local styling and images
│   │   ├── components/            # Reusable UI parts
│   │   ├── pages/                 # Full views (Home, Menu, Booking, Admin)
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── services/              # API call functions
│   │   ├── utils/                 # Helper functions
│   │   ├── App.jsx                # Main routing component
│   │   └── index.css              # Tailwind entry point
│   ├── package.json
│   └── tailwind.config.js
│
└── backend-spring-boot/           # Java Spring Boot application
    ├── src/main/java/com/cafe/
    │   ├── config/                # Security, Database configs
    │   ├── controllers/           # API endpoints
    │   ├── models/                # Entity classes
    │   ├── repositories/          # JPA Repositories
    │   ├── services/              # Business logic
    │   └── CafeApplication.java   # Spring Boot entry point
    ├── src/main/resources/
    │   └── application.properties # Environment variables
    └── pom.xml                    # Maven dependencies
