# Commercial App - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)
- Git

### 1. Clone & Install
```bash
# Clone the repository
git clone <repository-url>
cd commercial-app

# Install all dependencies (backend + frontend)
npm run install-all
```

### 2. Setup Environment
Create `.env` file in root directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/commercial
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=30d
```

Create `client/.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Setup Database with Sample Data
```bash
# Make sure MongoDB is running, then:
npm run setup
```

This will create:
- Sample users (Admin, Partner, Customer)
- Sample project with commercial items
- All necessary database collections

### 4. Start the Application
```bash
# Start both backend and frontend
npm run dev
```

- Backend: http://localhost:5000
- Frontend: http://localhost:3000

### 5. Login & Explore

Use these sample credentials:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@commercial.com | admin123 |
| Partner | partner@commercial.com | partner123 |
| Customer | customer@commercial.com | customer123 |

## 📋 What You Can Do

### As Admin (Full Access)
1. **Dashboard**: View project statistics
2. **Summary**: Create/edit/delete projects
3. **Commercial**: Manage pricing items
4. **All Modules**: Full access to DC, DR Site, Sizing, etc.
5. **Export**: Download Excel/PDF reports

### As Partner (Edit Access)
1. **Commercial**: Add/edit pricing items
2. **DC/DR/Sizing**: Configure infrastructure
3. **Queries**: Manage customer queries
4. **RACI**: Update responsibility matrix

### As Customer (Read-Only)
1. **Dashboard**: View project overview
2. **Summary**: View project details
3. **Commercial**: View pricing (read-only)
4. **Queries**: View responses
5. **RACI**: View responsibilities

## 🔧 Development Workflow

### Adding New Features
1. **Backend**: Create model → Add routes → Update middleware
2. **Frontend**: Create Redux slice → Add components → Update navigation

### Project Structure
```
├── server.js              # Express server
├── models/                # MongoDB schemas
├── routes/                # API endpoints
├── middleware/            # Auth middleware
├── client/                # React frontend
│   ├── src/components/    # UI components
│   ├── src/pages/         # Page components
│   ├── src/store/         # Redux store
│   └── public/            # Static files
└── setup.js              # Database setup script
```

### Available Scripts
```bash
npm run dev          # Start both servers
npm run server       # Backend only
npm run client       # Frontend only
npm run setup        # Setup database
npm run build        # Production build
npm run install-all  # Install all dependencies
```

## 🎯 Key Features Implemented

✅ **Authentication & Authorization**
- JWT-based login system
- Role-based access control
- Secure password hashing

✅ **Summary Module**
- Project creation and management
- Customer/Partner information
- Status tracking

✅ **Commercial Module**
- Dynamic pricing table
- MRC/OTC calculations
- Auto-totaling
- Category management

✅ **Dashboard**
- Project statistics
- Recent projects
- Cost summaries

✅ **Export Functionality**
- Excel export with multiple sheets
- PDF report generation

## 🚧 Modules Under Development

The following modules have placeholder implementations and are ready for enhancement:

- **DC Module**: Data center configuration
- **DR Site Module**: Disaster recovery setup
- **Sizing Module**: Infrastructure sizing
- **Queries Module**: Query management
- **RACI Module**: Responsibility matrix
- **Discount Module**: Pricing adjustments

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based route protection
- Input validation and sanitization
- CORS configuration

## 📊 Database Design

The application uses MongoDB with the following collections:
- `users` - User accounts and roles
- `summaries` - Project summaries
- `commercials` - Pricing items
- `dcs` - Data center configurations
- `drsites` - DR site configurations
- `sizings` - Infrastructure sizing
- `queries` - Customer queries
- `racis` - Responsibility matrix
- `discountnotes` - Discount information

## 🎨 UI/UX Features

- Material-UI components
- Dark/Light theme support
- Responsive navigation
- Data tables with sorting/filtering
- Form validation
- Loading states
- Error handling

## 📈 Next Steps

1. **Complete Module Implementation**: Finish DC, DR Site, Sizing modules
2. **Advanced Features**: Add search, filtering, audit logs
3. **Integrations**: Connect with external systems
4. **Mobile App**: React Native version
5. **Analytics**: Advanced reporting and dashboards

## 🆘 Troubleshooting

### Common Issues

**MongoDB Connection Error**
```bash
# Make sure MongoDB is running
mongod
# Or start MongoDB service
sudo systemctl start mongod
```

**Port Already in Use**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
# Or change PORT in .env file
```

**Module Not Found**
```bash
# Reinstall dependencies
rm -rf node_modules client/node_modules
npm run install-all
```

### Getting Help

1. Check the console for error messages
2. Verify environment variables are set correctly
3. Ensure MongoDB is running and accessible
4. Check network connectivity for API calls

## 🎉 Success!

You now have a fully functional Commercial Management System running locally. Start by logging in with the sample credentials and exploring the different modules.

Happy coding! 🚀