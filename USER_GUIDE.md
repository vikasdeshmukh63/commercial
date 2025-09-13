# Commercial Management System - User Guide

## 🎯 Application Flow & Usage Guide

### 📋 Table of Contents
1. [Getting Started](#getting-started)
2. [User Roles & Permissions](#user-roles--permissions)
3. [Application Workflow](#application-workflow)
4. [Module-by-Module Guide](#module-by-module-guide)
5. [Common Tasks](#common-tasks)
6. [Tips & Best Practices](#tips--best-practices)

---

## 🚀 Getting Started

### Step 1: Setup & Launch
```bash
# 1. Install dependencies
npm run install-all

# 2. Setup database with sample data
npm run setup

# 3. Start the application
npm run dev
```

### Step 2: Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

### Step 3: Login
Use these sample credentials or create your own account:

| Role | Email | Password | Access Level |
|------|-------|----------|--------------|
| **Admin** | admin@commercial.com | admin123 | Full access (all modules) |
| **Partner** | partner@commercial.com | partner123 | Edit Commercial, DC, DR, Sizing |
| **Customer** | customer@commercial.com | customer123 | Read-only access |

---

## 👥 User Roles & Permissions

### 🔴 Admin (Full Control)
- ✅ Create, edit, delete projects
- ✅ Manage all commercial items
- ✅ Configure DC and DR sites
- ✅ Manage infrastructure sizing
- ✅ Handle queries and responses
- ✅ Update RACI matrix
- ✅ Approve discounts
- ✅ Export reports
- ✅ Delete any records

### 🟡 Partner (Business Operations)
- ✅ Create and edit projects
- ✅ Manage commercial pricing
- ✅ Configure infrastructure (DC/DR/Sizing)
- ✅ Respond to customer queries
- ✅ Update RACI assignments
- ✅ Request discount approvals
- ✅ Export reports
- ❌ Cannot delete projects

### 🟢 Customer (View Only)
- ✅ View project summaries
- ✅ See commercial pricing
- ✅ View infrastructure details
- ✅ Check query responses
- ✅ See RACI responsibilities
- ✅ Export their project reports
- ❌ Cannot edit any data

---

## 🔄 Application Workflow

### Phase 1: Project Initiation
```
1. Admin/Partner logs in
2. Creates new project in Summary module
3. Fills customer details and opportunity ID
4. Project becomes available for all modules
```

### Phase 2: Commercial Planning
```
1. Navigate to Commercial module
2. Add pricing items (servers, software, services)
3. Set Monthly Recurring Cost (MRC) and One-Time Cost (OTC)
4. System auto-calculates totals
5. Review and adjust pricing
```

### Phase 3: Infrastructure Design
```
1. Configure Data Center (DC) requirements
2. Setup Disaster Recovery (DR) site
3. Calculate infrastructure sizing
4. Define server specifications
5. Validate cost calculations
```

### Phase 4: Project Management
```
1. Track customer queries and responses
2. Define RACI matrix (who does what)
3. Apply discounts if needed
4. Generate reports for stakeholders
5. Monitor project status
```

---

## 📚 Module-by-Module Guide

### 🏠 Dashboard
**Purpose**: Overview of all projects and key metrics

**What you see**:
- Total projects count
- Active projects
- Total MRC and OTC values
- Recent projects table

**Actions**:
- Click "View All" to go to Summary
- Click "View" on any project to see details
- Monitor project statistics

---

### 📊 Summary Module
**Purpose**: Project master data and overview

#### Creating a New Project (Admin/Partner only)
1. **Click "New Project" button**
2. **Fill required information**:
   - Customer Name (e.g., "ABC Corporation")
   - Partner Name (e.g., "Partners")
   - Opportunity ID (unique, e.g., "OPP-2024-001")
   - Date (project start date)
   - Status (Draft/In Progress/Completed/Cancelled)
3. **Click "Create"**
4. **Project is now available in all modules**

#### Managing Existing Projects
- **View**: See all projects in a table format
- **Edit**: Click edit icon to modify project details
- **Delete**: Admin can delete projects (⚠️ This removes all related data)
- **Status Tracking**: Update project status as it progresses

---

### 💰 Commercial Module
**Purpose**: Pricing and cost management

#### Adding Commercial Items
1. **Select a project** (must exist in Summary first)
2. **Click "Add Item" button**
3. **Fill item details**:
   - Item Name (e.g., "Cloud Server - Production")
   - Category (Infrastructure/Software/Services/Support/Other)
   - Description (optional details)
   - Monthly Pay (MRC in ₹)
   - One Time Cost (OTC in ₹)
4. **Click "Add"**
5. **System auto-calculates totals**

#### Managing Commercial Items
- **Edit**: Click edit icon to modify pricing
- **Delete**: Remove items no longer needed
- **Categories**: Organize items by type
- **Auto-totaling**: MRC and OTC totals update automatically
- **Export**: Download pricing sheets

#### Example Commercial Items
```
1. Cloud Server - Production
   Category: Infrastructure
   MRC: ₹25,000 | OTC: ₹50,000

2. Database License
   Category: Software  
   MRC: ₹15,000 | OTC: ₹30,000

3. Setup & Configuration
   Category: Services
   MRC: ₹0 | OTC: ₹20,000

4. 24x7 Support
   Category: Support
   MRC: ₹10,000 | OTC: ₹0
```

---

### 🏢 DC (Data Center) Module
**Purpose**: Primary data center configuration and server management

#### Adding DC Configurations
1. **Select a project** (must exist in Summary first)
2. **Click "Add Server" button**
3. **Fill server details**:
   - Server Name (e.g., "PROD-WEB-01")
   - Environment (Production/Staging/Development/Testing/DR)
   - Hosting Components (e.g., "Web Server, Load Balancer")
   - Unit Type (e.g., "Virtual Machine", "Physical Server")
   - Location (Primary DC/Secondary DC/Edge Location)

#### Server Specifications
- **vCores**: Number of CPU cores (e.g., 8)
- **RAM**: Memory allocation (e.g., "32GB")
- **Storage**: Disk space (e.g., "500GB SSD")
- **Operating System**: OS details (e.g., "Ubuntu 20.04 LTS")
- **Database**: Database software (e.g., "PostgreSQL 13")

#### Cost Configuration
- **Quantity**: Number of servers
- **Cost per Unit**: Individual server cost
- **MRC**: Monthly recurring cost per server
- **OTC**: One-time cost per server
- **Auto-calculation**: Total costs calculated automatically

#### Managing DC Items
- **Edit**: Click edit icon to modify server configurations
- **Delete**: Remove servers no longer needed
- **Environment filtering**: Organize by Production, Staging, etc.
- **Specifications view**: Expandable details for each server
- **Cost totals**: Automatic MRC and OTC calculations
- **Export**: Download complete DC configurations

#### Example DC Configuration
```
Server: PROD-WEB-01
Environment: Production
Components: Web Server, Application Server, Load Balancer
Specs: 8 vCores, 32GB RAM, 500GB SSD
OS: Ubuntu 20.04 LTS
Database: PostgreSQL 13
Quantity: 2 servers
MRC: ₹15,000 per server
OTC: ₹25,000 per server
Total MRC: ₹30,000 (2 × ₹15,000)
Total OTC: ₹50,000 (2 × ₹25,000)
```

---

### 🛡️ DR Site (Disaster Recovery) Module
**Purpose**: Backup site configuration

#### Key Differences from DC
- **DR-specific environments**: Production DR, Staging DR, etc.
- **RPO/RTO requirements**: Recovery Point/Time Objectives
- **DR Location**: Separate from primary DC
- **Reduced specifications**: Often smaller than primary
- **Cost optimization**: Balance between cost and recovery needs

#### DR Planning Considerations
- How quickly must systems recover? (RTO)
- How much data loss is acceptable? (RPO)
- Which systems are critical?
- What's the budget for DR?

---

### 📏 Sizing Module
**Purpose**: Infrastructure capacity planning

#### Sizing Parameters
- **Environment**: Which environment to size
- **Usage patterns**: Expected load and usage
- **Resource requirements**:
  - CPU cores needed
  - Memory requirements
  - Storage needs
  - Network bandwidth
- **Scaling factors**: Growth projections
- **Performance requirements**: Response times, throughput

#### Sizing Best Practices
1. Start with current requirements
2. Add growth buffer (20-30%)
3. Consider peak load scenarios
4. Plan for scalability
5. Balance cost vs. performance

---

### ❓ Queries Module
**Purpose**: Customer question and response tracking

#### Query Management Flow
1. **Customer/Partner raises query**
2. **Assign to team member**
3. **Set priority level** (Low/Medium/High/Critical)
4. **Categorize query** (Technical/Commercial/Legal/Process)
5. **Track status** (Open/In Progress/Resolved/Closed)
6. **Provide detailed response**
7. **Close when resolved**

#### Query Categories
- **Technical**: Infrastructure, configuration questions
- **Commercial**: Pricing, contract terms
- **Legal**: Compliance, regulatory requirements
- **Process**: Workflow, procedure questions

---

### 📋 RACI Module
**Purpose**: Responsibility assignment matrix

#### RACI Definitions
- **R** - Responsible (does the work)
- **A** - Accountable (signs off on work)
- **C** - Consulted (provides input)
- **I** - Informed (kept updated)

#### Typical RACI Setup
```
Activity: Server Setup
- Client: I (Informed of progress)
- Partner: R (Responsible for setup)
- ESDS: A (Accountable for delivery)

Activity: Security Configuration
- Client: C (Consulted on requirements)
- Partner: R (Responsible for implementation)
- ESDS: A (Accountable for security)
```

#### Project Phases
- **Planning**: Initial project setup
- **Design**: Architecture and specifications
- **Implementation**: Actual deployment
- **Testing**: Quality assurance
- **Deployment**: Go-live activities
- **Support**: Ongoing maintenance

---

### 💸 Discount Module
**Purpose**: Pricing adjustments and approvals

#### Discount Types
- **Percentage**: 10% off total cost
- **Fixed Amount**: ₹50,000 reduction
- **Volume Discount**: Bulk pricing
- **Early Bird**: Early commitment discount
- **Custom**: Special arrangements

#### Discount Approval Flow
1. **Partner requests discount**
2. **Specify discount type and value**
3. **Set validity period**
4. **Admin reviews and approves**
5. **Apply to commercial pricing**
6. **Update project totals**

---

## 🎯 Common Tasks

### Task 1: Create a Complete Project
```
1. Login as Admin/Partner
2. Go to Summary → Click "New Project"
3. Fill: Customer="XYZ Corp", Partner="partner", OppID="OPP-2024-002"
4. Go to Commercial → Add pricing items
5. Configure DC and DR requirements
6. Set up RACI matrix
7. Export final report
```

### Task 2: Respond to Customer Query
```
1. Login as Partner
2. Go to Queries module
3. Find open query
4. Click edit → Add response
5. Update status to "Resolved"
6. Customer can now see response
```

### Task 3: Apply Discount
```
1. Login as Partner
2. Go to Discount module
3. Click "Add Discount"
4. Set type, value, validity
5. Submit for approval
6. Admin approves
7. Discount reflects in Commercial totals
```

### Task 4: Export Project Report
```
1. Go to Commercial module
2. Select project
3. Click "Export" button
4. Choose Excel or PDF
5. Download complete report
6. Share with stakeholders
```

---

## 💡 Tips & Best Practices

### 🎯 Project Management
- **Start with Summary**: Always create project summary first
- **Unique Opportunity IDs**: Use consistent naming (OPP-YYYY-NNN)
- **Regular Updates**: Keep project status current
- **Clear Descriptions**: Add detailed item descriptions

### 💰 Commercial Planning
- **Itemize Everything**: Break down costs into clear items
- **Use Categories**: Organize items by Infrastructure/Software/Services
- **Regular Reviews**: Update pricing as requirements change
- **Document Assumptions**: Add notes about pricing basis

### 🏗️ Infrastructure Design
- **Plan for Growth**: Size 20-30% above current needs
- **Consider DR**: Always plan disaster recovery
- **Document Specs**: Clear specifications prevent confusion
- **Cost Optimization**: Balance performance vs. cost

### 📞 Customer Communication
- **Quick Responses**: Respond to queries promptly
- **Clear Answers**: Provide detailed, understandable responses
- **Track Everything**: Log all customer interactions
- **Escalate When Needed**: Involve seniors for complex issues

### 📊 Reporting & Analytics
- **Regular Exports**: Generate reports for stakeholders
- **Monitor Trends**: Track project costs and timelines
- **Dashboard Reviews**: Check dashboard regularly
- **Data Accuracy**: Ensure all data is current and correct

---

## 🚨 Troubleshooting Common Issues

### Issue: Can't see project in other modules
**Solution**: Make sure project exists in Summary module first

### Issue: Totals not updating
**Solution**: Refresh the page or check if all items are saved

### Issue: Can't edit items
**Solution**: Check your user role permissions

### Issue: Export not working
**Solution**: Ensure project has data and try again

### Issue: Login problems
**Solution**: Check credentials or contact admin

---

## 📞 Getting Help

### For Technical Issues
1. Check browser console for errors
2. Verify internet connection
3. Try refreshing the page
4. Contact system administrator

### For Business Process Questions
1. Refer to this user guide
2. Check with your team lead
3. Contact project manager
4. Escalate to admin if needed

### For Feature Requests
1. Document the requirement
2. Discuss with stakeholders
3. Submit to development team
4. Plan for future releases

---

## 🎉 Success Metrics

You're using the system effectively when you can:
- ✅ Create projects quickly and accurately
- ✅ Manage commercial pricing efficiently
- ✅ Track all customer interactions
- ✅ Generate reports on demand
- ✅ Collaborate effectively with team members
- ✅ Maintain data accuracy and completeness

---

**Happy project managing! 🚀**

*For additional support, contact your system administrator or refer to the technical documentation.*