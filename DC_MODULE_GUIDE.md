# DC Module - Complete Guide

## 🏢 Data Center Configuration Module

The DC (Data Center) module is now fully implemented with all the features you requested. Here's everything you need to know:

---

## ✅ Implemented Features

### 🔧 **Environment Configuration**
- **Production**: Live production servers
- **Staging**: Pre-production testing environment
- **Development**: Development and testing servers
- **Testing**: Quality assurance environment
- **DR**: Disaster recovery servers

### 🖥️ **Hosting Components Management**
- Web servers, application servers, load balancers
- Database servers, backup servers
- Development environments, testing tools
- Custom component descriptions

### 📊 **Server Specifications**
- **vCores**: CPU core allocation
- **RAM**: Memory specifications (e.g., "32GB")
- **Storage**: HDD/SSD specifications (e.g., "500GB SSD")
- **Operating System**: OS details (e.g., "Ubuntu 20.04 LTS")
- **Database**: Database software (e.g., "PostgreSQL 13")

### 💰 **Cost Calculations**
- **Cost per Unit**: Individual server pricing
- **Quantity**: Number of servers
- **MRC**: Monthly Recurring Cost (auto-calculated)
- **OTC**: One Time Cost (auto-calculated)
- **Total calculations**: Automatic totaling with quantity

### 🔄 **Multiple Server Support**
- Add unlimited server configurations
- Different environments per project
- Bulk operations support
- Individual server management

---

## 🚀 How to Use the DC Module

### Step 1: Access the Module
1. **Login** to the system
2. **Select a project** (must exist in Summary first)
3. **Click "DC" in the sidebar**
4. **You'll see the DC configuration page**

### Step 2: Add Your First Server
1. **Click "Add Server" button**
2. **Fill in Basic Information**:
   ```
   Server Name: PROD-WEB-01
   Environment: Production
   Hosting Components: Web Server, Application Server, Load Balancer
   Unit Type: Virtual Machine
   Location: Primary DC
   ```

3. **Configure Server Specifications**:
   ```
   vCores: 8
   RAM: 32GB
   Storage: 500GB SSD
   OS: Ubuntu 20.04 LTS
   Database: PostgreSQL 13
   ```

4. **Set Cost Information**:
   ```
   Quantity: 2
   Cost per Unit: ₹5,000
   MRC: ₹15,000
   OTC: ₹25,000
   ```

5. **Click "Add"** to save the configuration

### Step 3: View and Manage Servers
- **Server List**: See all configured servers in a table
- **Environment Tags**: Color-coded environment indicators
- **Specifications**: Expandable accordion with full server details
- **Cost Totals**: Automatic calculation of total MRC and OTC
- **Actions**: Edit or delete individual servers

### Step 4: Export DC Configurations
1. **Click "Export" button**
2. **Choose Excel format**
3. **Download includes**:
   - Complete server specifications
   - Cost breakdowns
   - Environment categorization
   - Total calculations

---

## 📋 Sample DC Configurations

The system comes with pre-configured sample data:

### **Production Environment**
```
Server: PROD-WEB-01
- Environment: Production
- Components: Web Server, Application Server, Load Balancer
- Specs: 8 vCores, 32GB RAM, 500GB SSD
- OS: Ubuntu 20.04 LTS
- Database: PostgreSQL 13
- Quantity: 2 servers
- MRC: ₹15,000 × 2 = ₹30,000
- OTC: ₹25,000 × 2 = ₹50,000

Server: PROD-DB-01
- Environment: Production
- Components: Database Server, Backup Server
- Specs: 16 vCores, 64GB RAM, 1TB SSD
- OS: Ubuntu 20.04 LTS
- Database: PostgreSQL 13 with Replication
- Quantity: 1 server
- MRC: ₹12,000
- OTC: ₹20,000
```

### **Staging Environment**
```
Server: STAGE-WEB-01
- Environment: Staging
- Components: Web Server, Application Server
- Specs: 4 vCores, 16GB RAM, 250GB SSD
- OS: Ubuntu 20.04 LTS
- Database: PostgreSQL 13
- Quantity: 1 server
- MRC: ₹5,000
- OTC: ₹10,000
```

### **Development Environment**
```
Server: DEV-ENV-01
- Environment: Development
- Components: Development Environment, Testing Tools
- Specs: 2 vCores, 8GB RAM, 100GB SSD
- OS: Ubuntu 20.04 LTS
- Database: PostgreSQL 13
- Quantity: 2 servers
- MRC: ₹3,000
- OTC: ₹5,000
```

---

## 🎯 Key Features Explained

### **Environment Color Coding**
- 🔴 **Production**: Red (critical systems)
- 🟡 **Staging**: Yellow (pre-production)
- 🔵 **Development**: Blue (development work)
- 🟢 **Testing**: Green (quality assurance)
- 🟣 **DR**: Purple (disaster recovery)

### **Specifications Accordion**
- **Collapsed view**: Shows summary (e.g., "8C / 32GB / 500GB SSD")
- **Expanded view**: Shows full details including OS and database
- **Easy scanning**: Quick overview of all server specs

### **Cost Calculations**
- **Per server costs**: Individual server pricing
- **Quantity multiplication**: Automatic calculation for multiple servers
- **Total summaries**: Overall MRC and OTC for all servers
- **Real-time updates**: Costs update as you add/edit servers

### **Location Management**
- **Primary DC**: Main data center location
- **Secondary DC**: Backup data center
- **Edge Location**: Distributed edge computing

---

## 🔐 Role-Based Access

### **Admin Users**
- ✅ Add, edit, delete DC configurations
- ✅ Manage all environments
- ✅ Export DC reports
- ✅ View cost calculations

### **Partner Users**
- ✅ Add, edit DC configurations
- ✅ Manage server specifications
- ✅ Export DC reports
- ❌ Cannot delete projects (but can delete individual servers)

### **Customer Users**
- ✅ View DC configurations
- ✅ See server specifications
- ✅ Export their project DC reports
- ❌ Cannot edit any configurations

---

## 📊 Integration with Other Modules

### **Summary Module Integration**
- DC totals contribute to overall project costs
- Server counts visible in project overview
- Environment status tracking

### **Commercial Module Integration**
- DC costs can reference commercial pricing
- Infrastructure items link to DC specifications
- Consistent cost calculations

### **Export Integration**
- DC data included in Excel exports
- Separate "Data Center" sheet in exports
- Complete specifications and cost breakdowns

---

## 💡 Best Practices

### **Naming Conventions**
- Use consistent server naming: `ENV-TYPE-##`
- Examples: `PROD-WEB-01`, `STAGE-DB-01`, `DEV-APP-01`

### **Environment Planning**
- **Production**: Size for actual load + 20% buffer
- **Staging**: Mirror production but can be smaller
- **Development**: Minimal specs for development work
- **Testing**: Adequate for load testing scenarios

### **Cost Management**
- **Regular reviews**: Update costs as requirements change
- **Quantity planning**: Consider growth and scaling needs
- **Specification accuracy**: Ensure specs match actual requirements

### **Documentation**
- **Clear descriptions**: Detailed hosting components
- **Specification details**: Complete vCores, RAM, storage info
- **Regular updates**: Keep configurations current

---

## 🚨 Troubleshooting

### **Common Issues**

**Can't see DC module**
- Ensure you have a project selected in Summary first
- Check your user role permissions

**Servers not saving**
- Verify all required fields are filled
- Check network connection
- Ensure project exists in Summary

**Costs not calculating**
- Refresh the page
- Check that quantity and cost fields have valid numbers
- Verify MRC and OTC values are entered

**Export not working**
- Ensure project has DC data
- Check browser popup blockers
- Try refreshing and exporting again

---

## 🎉 You're Ready!

The DC module is now fully functional with all requested features:

✅ **Environment configuration** (Production, Staging, etc.)  
✅ **Hosting components management**  
✅ **Server specifications** (vCores, RAM, HDD, OS, DB)  
✅ **Cost calculations** (MRC, OTC)  
✅ **Multiple server support**  

Start by exploring the sample data, then create your own server configurations for your projects!

---

**Need help?** Refer to the main USER_GUIDE.md or contact your system administrator.