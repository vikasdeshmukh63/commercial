# Commercial Management System

A comprehensive MERN stack web application for managing commercial proposals, infrastructure sizing, and project tracking. This application converts the Excel-based Commercial workflow into a modern web-based system with role-based access control.

## Features

### Authentication & Authorization
- **Role-based access control**: Admin, Partner, Customer
- **JWT-based authentication**
- **Secure password hashing**

### Modules (Based on Excel Sheets)

1. **Summary Module**
   - Customer and Partner information
   - Opportunity ID management
   - Project status tracking
   - Total cost calculations

2. **Commercial Module**
   - Dynamic pricing table
   - Monthly Recurring Cost (MRC) and One-Time Cost (OTC)
   - Auto-calculated totals
   - Category-based item organization

3. **DC Module** (Data Center)
   - Environment configuration
   - Server specifications (vCores, RAM, HDD, OS, DB)
   - Hosting components management
   - Cost per unit calculations

4. **DR Site Module** (Disaster Recovery)
   - DR environment setup
   - RPO/RTO specifications
   - Separate dataset from primary DC

5. **Sizing Module**
   - Infrastructure sizing calculations
   - Usage analysis
   - Core and memory requirements
   - Editable sizing grid

6. **Queries Module**
   - Query and response tracking
   - Status management
   - Priority levels
   - Assignment workflow

7. **RACI Module**
   - Responsibility matrix
   - Role assignments (Client/Partner/ESDS)
   - Phase-wise categorization

8. **Discount Module**
   - Pricing notes and adjustments
   - Approval workflow
   - Discount types and validity

### Additional Features
- **Dashboard with analytics**
- **Export to Excel/PDF**
- **Search and filtering**
- **Audit logging**
- **Responsive Material-UI design**

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **XLSX** for Excel export
- **PDFKit** for PDF generation

### Frontend
- **React** with hooks and functional components
- **Redux Toolkit** for state management
- **Material-UI (MUI)** for UI components
- **React Router** for navigation
- **Axios** for API calls

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/commercial
   JWT_SECRET=your_jwt_secret_key_here_change_in_production
   JWT_EXPIRE=30d
   ```

3. **Start MongoDB**
   Make sure MongoDB is running on your system.

4. **Start the backend server**
   ```bash
   npm run dev
   ```
   The server will start on http://localhost:5000

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the client directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the React development server**
   ```bash
   npm start
   ```
   The application will open at http://localhost:3000

## Usage

### Initial Setup

1. **Register an Admin user**
   - Go to http://localhost:3000/login
   - Click on "Register" tab
   - Create an account with "Admin" role

2. **Create your first project**
   - Navigate to Summary page
   - Click "New Project"
   - Fill in customer details and opportunity ID

3. **Add commercial items**
   - Go to Commercial module
   - Add pricing items with MRC and OTC values
   - View auto-calculated totals

### Role Permissions

- **Admin**: Full access to all modules, can delete records
- **Partner**: Can edit Commercial, DC, DR Site, Sizing modules
- **Customer**: Read-only access to Summary, Queries, RACI modules

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Summary
- `GET /api/summary` - Get all summaries
- `POST /api/summary` - Create new summary
- `PUT /api/summary/:id` - Update summary
- `DELETE /api/summary/:id` - Delete summary

### Commercial
- `GET /api/commercial/:oppId` - Get commercial items
- `POST /api/commercial/:oppId` - Create commercial item
- `PUT /api/commercial/:oppId/:id` - Update commercial item
- `DELETE /api/commercial/:oppId/:id` - Delete commercial item

### Export
- `GET /api/export/:oppId/excel` - Export to Excel
- `GET /api/export/:oppId/pdf` - Export to PDF

## Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (Admin/Partner/Customer),
  isActive: Boolean
}
```

### Summary Collection
```javascript
{
  customerName: String,
  partnerName: String,
  date: Date,
  oppId: String (unique),
  status: String,
  totalMRC: Number,
  totalOTC: Number,
  createdBy: ObjectId,
  updatedBy: ObjectId
}
```

### Commercial Collection
```javascript
{
  oppId: String,
  srNo: Number,
  item: String,
  monthlyPay: Number,
  otc: Number,
  description: String,
  category: String,
  createdBy: ObjectId,
  updatedBy: ObjectId
}
```

## Development

### Project Structure
```
├── server.js              # Express server setup
├── models/               # MongoDB schemas
├── routes/               # API routes
├── middleware/           # Authentication middleware
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── store/        # Redux store and slices
│   │   └── App.js        # Main app component
│   └── public/
└── README.md
```

### Adding New Features

1. **Backend**: Create model → Add routes → Update middleware
2. **Frontend**: Create Redux slice → Add components → Update navigation

### Testing

Run backend tests:
```bash
npm test
```

Run frontend tests:
```bash
cd client && npm test
```

## Deployment

### Production Build

1. **Build the React app**
   ```bash
   cd client && npm run build
   ```

2. **Set environment variables**
   ```env
   NODE_ENV=production
   MONGODB_URI=your_production_mongodb_uri
   JWT_SECRET=your_production_jwt_secret
   ```

3. **Start the production server**
   ```bash
   npm start
   ```

### Docker Deployment (Optional)

Create a `Dockerfile`:
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN cd client && npm install && npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.

## Roadmap

- [ ] Complete all module implementations
- [ ] Add advanced filtering and search
- [ ] Implement audit logging
- [ ] Add email notifications
- [ ] Mobile app development
- [ ] Advanced reporting and analytics
- [ ] Integration with external systems