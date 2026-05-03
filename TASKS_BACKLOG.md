# Doctor Appointment Platform - Frontend Tasks Backlog

This document contains all planned frontend tasks for the project, organized by version.

---

## **V1.0 - MVP**

### **Infrastructure & Setup**
- [x] Initialize Next.js project (TypeScript)
- [ ] Setup ESLint + Prettier
- [x] Setup TailwindCSS
- [ ] Configure environment variables (.env)
- [x] Setup folder structure (app router)
- [ ] Configure axios/fetch API client
- [ ] Setup global state management (Zustand/Context)
- [ ] Setup React Query for server state
- [x] Configure path aliases

### **Authentication**
- [ ] Login page
- [ ] Register page (patient / doctor flows)
- [ ] Password reset page
- [ ] Auth token storage (httpOnly cookie or localStorage)
- [ ] Auth guard (protected routes)
- [ ] Role-based route redirection
- [ ] Logout flow

### **User Profile**
- [ ] View profile page
- [ ] Edit profile page
- [ ] Change password page
- [ ] Upload/delete profile photo
- [ ] Update preferences

### **Doctor Dashboard**
- [ ] Doctor dashboard layout
- [ ] Doctor profile setup page
- [ ] Availability setup page
- [ ] Block dates (vacation) page
- [ ] View appointments list
- [ ] Accept/decline appointment
- [ ] Manage secretaries page
- [ ] Invite secretary form

### **Patient Flow**
- [ ] Search/browse doctors page
- [ ] Doctor public profile page
- [ ] Book appointment page (logged in)
- [ ] Book appointment page (guest)
- [ ] View my appointments page
- [ ] Cancel appointment
- [ ] Reschedule appointment

### **Secretary Dashboard**
- [ ] Secretary dashboard layout
- [ ] View office appointments
- [ ] Accept/decline appointment
- [ ] Accept invitation page

### **Subscription & Payment**
- [ ] Subscription plans page
- [ ] Upgrade plan flow (Stripe checkout redirect)
- [ ] Subscription status page
- [ ] Usage stats display (limits indicator)

### **Core UI**
- [x] Design system / component library setup
- [x] Common components (Button, Input, Modal, Toast)
- [ ] Layout components (Navbar, Sidebar, Footer)
- [ ] Loading states & skeletons
- [ ] Error pages (404, 500)
- [ ] Empty states
- [ ] Responsive design (mobile first)

---

## **V2.0 - Enhanced Features**

### **Doctor Profile CMS**
- [ ] Profile blocks builder (drag & drop)
- [ ] Add/edit/delete profile blocks
- [ ] Block types UI (education, experience, services, gallery)
- [ ] Profile preview page

### **Reviews & Ratings**
- [ ] Leave a review form (post-appointment)
- [ ] Doctor reviews list on public profile
- [ ] Star rating component
- [ ] Review moderation page (admin)

### **Chat System**
- [ ] Chat UI (conversations list + message thread)
- [ ] Real-time messaging (Socket.io client)
- [ ] Typing indicators
- [ ] Online/offline status
- [ ] File sharing in chat
- [ ] Quick reply templates

### **Analytics Dashboard**
- [ ] Appointments chart (daily/monthly)
- [ ] Revenue stats
- [ ] Patient list with filters
- [ ] Peak hours chart
- [ ] No-show rate display
- [ ] Export reports button (CSV/PDF)

### **Notifications**
- [ ] In-app notification bell
- [ ] Notification list/dropdown
- [ ] Mark as read
- [ ] Real-time notifications (WebSocket)

### **CI/CD**
- [ ] GitHub Actions: lint + build on PR
- [ ] Deploy to staging (Vercel/Netlify)
- [ ] Deploy to production

---

## **V3.0 - Advanced Features**

### **AI Chatbot (PRO)**
- [ ] Chatbot widget on doctor public profile
- [ ] Chat UI for bot responses
- [ ] Handoff to human indicator
- [ ] Doctor customizes bot responses page

### **Video Consultations (PRO)**
- [ ] Video call page (Twilio/Agora)
- [ ] Join consultation button
- [ ] Recording consent UI

### **Medical Records**
- [ ] Upload patient documents page
- [ ] View medical history page
- [ ] E-prescription view page
- [ ] Secure document sharing UI

### **Multi-language Support**
- [x] Setup next-intl (cookie-based, no URL prefix)
- [x] Arabic (RTL) support
- [x] French translation
- [x] Language switcher component

### **Advanced Analytics (PRO)**
- [ ] Custom reports page
- [ ] Revenue trends charts
- [ ] Patient demographics charts
- [ ] Conversion rate display

---

**Last Updated:** 2026-04-10
**Project:** Doctor Appointment Platform - Frontend
