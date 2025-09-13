# KPDCL Commercial System - Step-by-Step Tutorial

## 🎯 Complete Walkthrough: Creating Your First Project

This tutorial will guide you through creating a complete project from start to finish.

---

## 🚀 Prerequisites

1. **System is running**:
   ```bash
   npm run setup    # First time only
   npm run dev      # Start the application
   ```

2. **Access the application**: http://localhost:3000

3. **Sample login credentials**:
   - **Admin**: admin@kpdcl.com / admin123
   - **Partner**: partner@kpdcl.com / partner123
   - **Customer**: customer@kpdcl.com / customer123

---

## 📝 Tutorial: Creating "ABC Corp Cloud Migration Project"

### Step 1: Login to the System
1. **Open browser** → Go to http://localhost:3000
2. **You'll see the login page**
3. **Enter credentials**:
   - Email: `admin@kpdcl.com`
   - Password: `admin123`
4. **Click "Sign In"**
5. **You'll be redirected to the Dashboard**

### Step 2: Explore the Dashboard
**What you'll see**:
- 📊 **Statistics cards**: Total projects, active projects, costs
- 📋 **Recent projects table**: Sample project "OPP-2024-001"
- 🧭 **Navigation sidebar**: All available modules

**Try this**:
- Click on the sample project "OPP-2024-001" to see existing data
- Explore the Commercial module to see sample pricing items
- Return to Dashboard by clicking "Dashboard" in the sidebar

### Step 3: Create a New Project
1. **Click "Summary" in the sidebar**
2. **Click "New Project" button** (top right)
3. **Fill in the project details**:
   ```
   Customer Name: ABC Corporation
   Partner Name: KPDCL Solutions
   Opportunity ID: OPP-2024-ABC
   Date: [Today's date]
   Status: Draft
   ```
4. **Click "Create"**
5. **Success!** Your project is now created and appears in the table

### Step 4: Add Commercial Pricing Items
1. **Click "Commercial" in the sidebar**
2. **Select your project** (OPP-2024-ABC should be auto-selected)
3. **Click "Add Item" button**

**Add Item 1 - Cloud Servers**:
```
Item Name: AWS EC2 Instances - Production
Category: Infrastructure
Description: 4 x m5.xlarge instances for production workload
Monthly Pay: 45000
One Time Cost: 25000
```
**Click "Add"**

**Add Item 2 - Database**:
```
Item Name: RDS PostgreSQL Database
Category: Software
Description: Multi-AZ PostgreSQL database with backup
Monthly Pay: 18000
One Time Cost: 15000
```
**Click "Add"**

**Add Item 3 - Migration Services**:
```
Item Name: Data Migration Services
Category: Services
Description: Complete data migration from on-premise to cloud
Monthly Pay: 0
One Time Cost: 75000
```
**Click "Add"**

**Add Item 4 - Support**:
```
Item Name: 24x7 Technical Support
Category: Support
Description: Round-the-clock monitoring and support
Monthly Pay: 12000
One Time Cost: 0
```
**Click "Add"**

5. **Check the totals**:
   - **Total MRC**: ₹75,000
   - **Total OTC**: ₹1,15,000

### Step 5: Configure Data Center (DC)
1. **Click "DC" in the sidebar**
2. **You'll see a placeholder page** (module under development)
3. **This would typically include**:
   - Server specifications
   - Environment configuration
   - Cost calculations

### Step 6: View as Different User Roles

**Switch to Partner View**:
1. **Logout** (click user avatar → Logout)
2. **Login as Partner**:
   - Email: `partner@kpdcl.com`
   - Password: `partner123`
3. **Navigate to Commercial module**
4. **Notice**: You can edit items but cannot delete the project

**Switch to Customer View**:
1. **Logout and login as Customer**:
   - Email: `customer@kpdcl.com`
   - Password: `customer123`
2. **Navigate to Commercial module**
3. **Notice**: Everything is read-only, no "Add Item" or edit buttons

### Step 7: Export Your Project Report
1. **Login back as Admin** (admin@kpdcl.com / admin123)
2. **Go to Commercial module**
3. **Select your project** (OPP-2024-ABC)
4. **Click "Export" button**
5. **Choose "Excel"** - Downloads a complete Excel report
6. **Try "PDF"** - Downloads a PDF summary

### Step 8: Manage Project Status
1. **Go to Summary module**
2. **Find your project** (OPP-2024-ABC)
3. **Click the edit icon** (pencil icon)
4. **Change status** from "Draft" to "In Progress"
5. **Click "Update"**
6. **Notice**: Status chip changes color in the table

---

## 🎯 What You've Accomplished

✅ **Created a complete project** with customer details  
✅ **Added commercial pricing items** with MRC and OTC  
✅ **Experienced different user roles** and permissions  
✅ **Generated project reports** in Excel and PDF formats  
✅ **Managed project status** and lifecycle  

---

## 🔄 Next Steps - Advanced Features

### Managing Customer Queries
1. **Go to Queries module**
2. **Add sample queries** from customers
3. **Assign priorities** and track responses
4. **Update status** as queries are resolved

### Setting Up RACI Matrix
1. **Go to RACI module**
2. **Define project activities**
3. **Assign roles** (Responsible, Accountable, Consulted, Informed)
4. **Map responsibilities** between Client, Partner, and ESDS

### Applying Discounts
1. **Go to Discount module**
2. **Create discount requests**
3. **Set approval workflows**
4. **Apply approved discounts** to commercial pricing

---

## 💡 Pro Tips

### 🎯 Project Management
- **Always start with Summary**: Create project context first
- **Use descriptive names**: Clear item descriptions help everyone
- **Regular updates**: Keep project status current
- **Consistent naming**: Use standard opportunity ID formats

### 💰 Pricing Strategy
- **Break down costs**: Separate infrastructure, software, services
- **Include everything**: Don't forget setup, migration, support costs
- **Plan for growth**: Consider scaling requirements
- **Document assumptions**: Add notes about pricing basis

### 👥 Team Collaboration
- **Use appropriate roles**: Give team members correct access levels
- **Track all interactions**: Log customer queries and responses
- **Regular reviews**: Check project progress frequently
- **Clear communication**: Use RACI matrix to define responsibilities

### 📊 Reporting
- **Export regularly**: Generate reports for stakeholders
- **Multiple formats**: Use Excel for detailed analysis, PDF for presentations
- **Version control**: Keep track of pricing changes over time
- **Share appropriately**: Consider what each stakeholder needs to see

---

## 🚨 Common Mistakes to Avoid

❌ **Skipping Summary creation**: Other modules won't work without a project  
❌ **Inconsistent opportunity IDs**: Use a standard format  
❌ **Missing cost items**: Include all components (setup, migration, support)  
❌ **Wrong user roles**: Ensure team members have appropriate access  
❌ **Not updating status**: Keep project status current  
❌ **Forgetting to save**: Always save changes before navigating away  

---

## 🎉 Congratulations!

You've successfully completed the KPDCL Commercial System tutorial! You now know how to:

- ✅ Create and manage projects
- ✅ Handle commercial pricing
- ✅ Work with different user roles
- ✅ Generate professional reports
- ✅ Track project lifecycle

### 🚀 Ready for Production?

Your team can now use this system to:
1. **Manage multiple customer projects**
2. **Track commercial proposals**
3. **Generate professional reports**
4. **Collaborate effectively**
5. **Maintain project history**

---

## 📞 Need Help?

- **Technical Issues**: Check browser console, try refreshing
- **Business Questions**: Refer to USER_GUIDE.md
- **Feature Requests**: Contact your development team
- **Training**: Share this tutorial with new team members

**Happy project managing! 🚀**