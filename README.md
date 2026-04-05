# Wathiqa - Employee Desk Management System

A production-ready React.js frontend application for managing employee documents and tracking document expiry for Saudi companies.

## Features

### 🎯 Core Features
- **Employee Management**: Add, edit, view, and delete employee records
- **Document Management**: Track multiple documents per employee (Iqama, Passport, Insurance, etc.)
- **Automatic Status Calculation**: Documents automatically marked as Valid, Expiring Soon, or Expired
- **Real-time Alerts**: Notification bell displays expiring documents
- **Compliance Dashboard**: View document distribution and department compliance rates
- **Advanced Reporting**: Filter and export compliance reports
- **Dark Mode & Multi-language**: Support for light/dark themes and English/Arabic UI

### 📱 Pages
1. **Login** - Secure authentication with demo credentials
2. **Dashboard** - Overview with statistics, charts, and expiring documents
3. **Employees** - Employee list with search, filter, and pagination
4. **Employee Profile** - Detailed employee information and documents
5. **Documents** - Centralized document management
6. **Reports** - Compliance reporting with export functionality
7. **Settings** - Customize reminder days, theme, language, and company info

### 🔧 Technology Stack
- **React 18** with functional components and hooks
- **React Router v6** for navigation
- **Recharts** for charts and analytics
- **Lucide React** for icons
- **Context API** for state management
- **CSS3** with custom styling (no framework)
- **Local Storage** for data persistence

## Project Structure

```
src/
├── components/
│   ├── Sidebar.js
│   ├── Navbar.js
│   ├── Layout.js
│   ├── DashboardCard.js
│   ├── PageHeader.js
│   ├── StatusBadge.js
│   ├── EmployeeTable.js
│   ├── DocumentTable.js
│   ├── EmployeeForm.js
│   └── DocumentForm.js
├── pages/
│   ├── Login.js
│   ├── Dashboard.js
│   ├── Employees.js
│   ├── EmployeeProfile.js
│   ├── Documents.js
│   ├── Reports.js
│   ├── Settings.js
│   └── NotFound.js
├── context/
│   ├── AuthContext.js
│   ├── EmployeeContext.js
│   ├── DocumentContext.js
│   └── SettingsContext.js
├── hooks/
│   ├── useAuth.js
│   ├── useEmployees.js
│   ├── useDocuments.js
│   └── useSettings.js
├── data/
│   ├── mockEmployees.js
│   ├── mockDocuments.js
│   └── mockNotifications.js
├── utils/
│   ├── dateUtils.js
│   └── statusUtils.js
├── styles/
│   ├── global.css
│   ├── Login.css
│   ├── Dashboard.css
│   ├── Employees.css
│   ├── EmployeeProfile.css
│   ├── Documents.css
│   ├── Reports.css
│   ├── Settings.css
│   ├── NotFound.css
│   ├── Sidebar.css
│   ├── Navbar.css
│   ├── Layout.css
│   ├── PageHeader.css
│   ├── DashboardCard.css
│   ├── EmployeeTable.css
│   ├── DocumentTable.css
│   ├── EmployeeForm.css
│   └── DocumentForm.css
├── App.js
└── index.js
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd "Wathiqa FE"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## Usage

### Demo Login
- **Email**: admin@company.com
- **Password**: demo123

### Features Guide

#### Dashboard
- View key metrics: Total Employees, Total Documents, Expiring Soon, Expired
- See documents expiring soon in a dedicated table
- View document distribution with pie chart
- View department compliance with bar chart

#### Employees
- Search employees by name, email, or ID
- Filter by department and employment status
- Add new employees with full profile
- Edit employee information
- View detailed employee profiles with related documents

#### Documents
- Manage documents for all employees
- Filter by document type or status
- View expiry dates and days remaining
- Add new documents with automatic status calculation
- Delete expired or obsolete documents

#### Reports
- Generate compliance reports
- Filter by department, document type, or status
- Export reports as CSV
- View compliance metrics and rates

#### Settings
- Configure expiry reminder period (30, 45, or 60 days)
- Toggle dark mode for comfortable viewing
- Switch between English and Arabic UI
- Update company information

## Document Status Logic

Documents automatically calculate their status based on:
- **Valid**: Document expiry date is more than reminder days in the future
- **Expiring Soon**: Document expires within the reminder period
- **Expired**: Document expiry date has passed

The default reminder period is 60 days but can be customized in Settings.

## Mock Data

The application includes 10 mock employees and 32 mock documents with various scenarios:
- Documents expiring in 5, 20, and 35 days
- Already expired documents
- Valid documents for the next 6+ months
- Different document types and issuing authorities

## Styling

### Color Palette
- **Primary**: #0B5D3B (Saudi Green)
- **Secondary**: #1FA971 (Bright Green)
- **Accent**: #C9A227 (Gold)
- **Success**: #22C55E (Green)
- **Warning**: #F59E0B (Orange)
- **Danger**: #EF4444 (Red)
- **Background**: #F5F7F6 (Light Gray)

### Features
- Responsive design (mobile, tablet, desktop)
- Dark mode support
- RTL (Right-to-Left) support for Arabic
- Smooth animations and transitions
- Accessible form validation

## Data Persistence

All data is stored in the browser's localStorage and persists between sessions:
- Employee data
- Document data
- User settings (theme, language, reminder days)
- Authentication state

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Backend API integration
- Email notifications for expiring documents
- Document file uploads and preview
- Bulk employee/document import
- Advanced filtering and search
- Audit logs
- User roles and permissions
- Iqama verification integration

## License

This project is proprietary and confidential.

## Support

For support and questions, please contact your system administrator.

---

**Version**: 1.0.0  
**Last Updated**: April 2026
