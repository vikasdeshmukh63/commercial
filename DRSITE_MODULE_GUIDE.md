# DR Site Module - Complete Guide

## 🛡️ Disaster Recovery Site Configuration Module

The DR Site (Disaster Recovery) module is now fully implemented with all the features you requested. Here's everything you need to know:

---

## ✅ Implemented Features

### 🔧 **DR Environment Configuration**
- **Production DR**: Critical production system backups
- **Staging DR**: Pre-production environment backups
- **Development DR**: Development environment backups
- **Testing DR**: Quality assurance environment backups

### 📍 **DR Location Management**
- **Separate DR locations**: Mumbai DR Center, Bangalore Backup Site, etc.
- **Geographic distribution**: Different cities/regions for true DR
- **Location-based organization**: Group servers by DR site
- **Custom location naming**: Flexible location descriptions

### ⏱️ **RPO/RTO Specifications**
- **RPO (Recovery Point Objective)**: Maximum acceptable data loss
  - Examples: "1 hour", "4 hours", "24 hours"
- **RTO (Recovery Time Objective)**: Maximum acceptable downtime
  - Examples: "30 minutes", "2 hours", "8 hours"
- **Per-server RPO/RTO**: Individual recovery objectives for each system
- **Business impact alignment**: Match recovery objectives to business needs

### 🖥️ **DR Hosting Components**
- **DR-specific components**: Backup servers, database replicas, file storage
- **Monitoring systems**: DR site monitoring and alerting
- **Backup infrastructure**: Storage systems, replication tools
- **Recovery tools**: Automated failover, manual recovery procedures

### 📊 **Separate Dataset from Primary DC**
- **Independent data model**: Completely separate from DC module
- **DR-specific fields**: RPO/RTO, DR location, DR environment
- **Separate cost tracking**: Independent MRC/OTC calculations
- **Isolated management**: Add/edit/delete DR servers independently

---

## 🚀 How to Use the DR Site Module

### Step 1: Access the Module
1. **Login** to the system
2. **Select a project** (must exist in Summary first)
3. **Click "DR Site" in the sidebar**
4. **You'll see the DR Site configuration page**

### Step 2: Add Your First DR Server
1. **Click "Add DR Server" button**
2. **Fill in Basic Information**:
   ```
   DR Server Name: DR-WEB-01
   DR Environment: Production DR
   DR Location: Mumbai DR Center
   DR Hosting Components: DR Web Server, Database Replica, File Backup
   Unit Type: Virtual Machine
   ```

3. **Configure Recovery Objectives**:
   ```
   RPO (Recovery Point Objective): 4 hours
   RTO (Recovery Time Objective): 2 hours
   ```

4. **Set Server Specifications**:
   ```
   vCores: 4
   RAM: 16GB
   Storage: 250GB SSD
   OS: Ubuntu 20.04 LTS
   Database: PostgreSQL 13 Replica
   ```

5. **Configure Cost Information**:
   ```
   Quantity: 1
   Cost per Unit: ₹3,000
   MRC: ₹8,000
   OTC: ₹15,000
   ```

6. **Click "Add"** to save the DR configuration

### Step 3: View and Manage DR Servers
- **DR Server List**: See all configured DR servers in a table
- **Environment Tags**: Color-coded DR environment indicators
- **Location Display**: Clear DR location identification
- **RPO/RTO Display**: Recovery objectives visible at a glance
- **Specifications**: Expandable accordion with full server details
- **Cost Totals**: Automatic calculation of total DR costs
- **Actions**: Edit or delete individual DR servers

### Step 4: Export DR Configurations
1. **Click "Export" button**
2. **Choose Excel format**
3. **Download includes**:
   - Complete DR server specifications
   - RPO/RTO objectives
   - DR location details
   - Cost breakdowns
   - Total calculations

---

## 📋 Sample DR Configurations

The system comes with pre-configured sample DR data:

### **Production DR Environment**
```
Server: DR-WEB-01
- DR Environment: Production DR
- DR Location: Mumbai DR Center
- Components: DR Web Server, Database Replica, File Backup
- RPO: 4 hours (max data loss)
- RTO: 2 hours (max downtime)
- Specs: 4 vCores, 16GB RAM, 250GB SSD
- OS: Ubuntu 20.04 LTS
- Database: PostgreSQL 13 Replica
- Quantity: 1 server
- MRC: ₹8,000
- OTC: ₹15,000

Server: DR-DB-01
- DR Environment: Production DR
- DR Location: Mumbai DR Center
- Components: DR Database Server, Backup Storage, Monitoring
- RPO: 1 hour (critical data)
- RTO: 30 minutes (critical system)
- Specs: 8 vCores, 32GB RAM, 500GB SSD
- OS: Ubuntu 20.04 LTS
- Database: PostgreSQL 13 with Streaming Replication
- Quantity: 1 server
- MRC: ₹10,000
- OTC: ₹18,000
```

### **Staging DR Environment**
```
Server: DR-STAGE-01
- DR Environment: Staging DR
- DR Location: Bangalore Backup Site
- Components: Staging DR Environment, Testing Tools
- RPO: 24 hours (less critical)
- RTO: 4 hours (acceptable downtime)
- Specs: 2 vCores, 8GB RAM, 100GB SSD
- OS: Ubuntu 20.04 LTS
- Database: PostgreSQL 13
- Quantity: 1 server
- MRC: ₹3,000
- OTC: ₹8,000
```

---

## 🎯 Key Features Explained

### **DR Environment Color Coding**
- 🔴 **Production DR**: Red (critical DR systems)
- 🟡 **Staging DR**: Yellow (pre-production DR)
- 🔵 **Development DR**: Blue (development DR)
- 🟢 **Testing DR**: Green (QA DR systems)

### **RPO/RTO Display**
- **Inline display**: RPO and RTO shown directly in the table
- **Business context**: Clear understanding of recovery objectives
- **Per-server objectives**: Different RPO/RTO for different systems
- **Planning tool**: Helps with DR strategy planning

### **DR Location Management**
- **Geographic separation**: Ensures true disaster recovery
- **Location icons**: Visual indicators for DR sites
- **Flexible naming**: Custom DR location descriptions
- **Site organization**: Group servers by DR location

### **Separate Data Management**
- **Independent from DC**: Completely separate dataset
- **DR-specific fields**: Fields unique to disaster recovery
- **Separate totals**: Independent cost calculations
- **Isolated operations**: No impact on primary DC configurations

---

## 🔐 Role-Based Access

### **Admin Users**
- ✅ Add, edit, delete DR Site configurations
- ✅ Manage all DR environments
- ✅ Set RPO/RTO objectives
- ✅ Export DR reports
- ✅ View cost calculations

### **Partner Users**
- ✅ Add, edit DR Site configurations
- ✅ Manage DR server specifications
- ✅ Set recovery objectives
- ✅ Export DR reports
- ❌ Cannot delete projects (but can delete individual DR servers)

### **Customer Users**
- ✅ View DR Site configurations
- ✅ See recovery objectives
- ✅ View DR server specifications
- ✅ Export their project DR reports
- ❌ Cannot edit any configurations

---

## 📊 Integration with Other Modules

### **Summary Module Integration**
- DR costs contribute to overall project costs
- DR server counts visible in project overview
- DR status tracking in project summary

### **DC Module Separation**
- **Completely independent**: DR Site data separate from DC data
- **Different purposes**: DC for primary, DR Site for backup
- **Separate cost tracking**: Independent MRC/OTC calculations
- **Different specifications**: DR servers often have different specs

### **Export Integration**
- DR Site data included in Excel exports
- Separate "DR Site" sheet in exports
- Complete RPO/RTO and location information
- Independent cost breakdowns

---

## 💡 Best Practices

### **DR Naming Conventions**
- Use DR prefix: `DR-TYPE-##`
- Examples: `DR-WEB-01`, `DR-DB-01`, `DR-APP-01`
- Include DR location: `MUMBAI-DR-WEB-01`

### **RPO/RTO Planning**
- **Critical systems**: RPO ≤ 1 hour, RTO ≤ 30 minutes
- **Important systems**: RPO ≤ 4 hours, RTO ≤ 2 hours
- **Standard systems**: RPO ≤ 24 hours, RTO ≤ 8 hours
- **Development systems**: RPO ≤ 48 hours, RTO ≤ 24 hours

### **DR Location Strategy**
- **Geographic separation**: At least 100km from primary DC
- **Different risk zones**: Avoid same natural disaster areas
- **Connectivity**: Ensure reliable network connections
- **Infrastructure**: Adequate power, cooling, security

### **Cost Management**
- **Right-sizing**: DR servers can be smaller than production
- **Tiered approach**: Different DR levels for different systems
- **Regular reviews**: Update DR costs as requirements change
- **ROI analysis**: Balance DR costs with business risk

### **Documentation**
- **Clear descriptions**: Detailed DR hosting components
- **Recovery procedures**: Document failover processes
- **Regular testing**: Validate DR configurations
- **Update regularly**: Keep DR configurations current

---

## 🔄 DR vs DC Comparison

| Aspect | DC Module | DR Site Module |
|--------|-----------|----------------|
| **Purpose** | Primary production systems | Backup/recovery systems |
| **Environment** | Production, Staging, Dev, Test | Production DR, Staging DR, etc. |
| **Location** | Primary DC, Secondary DC | Mumbai DR Center, Bangalore Backup |
| **Specifications** | Full production specs | Often reduced specs |
| **Special Fields** | Location, standard specs | RPO/RTO, DR location |
| **Cost Model** | Full operational costs | DR-specific costs |
| **Usage** | Day-to-day operations | Disaster recovery scenarios |

---

## 🚨 Troubleshooting

### **Common Issues**

**Can't see DR Site module**
- Ensure you have a project selected in Summary first
- Check your user role permissions

**DR servers not saving**
- Verify all required fields are filled (DR location is required)
- Check network connection
- Ensure project exists in Summary

**RPO/RTO not displaying**
- These are optional fields, can be left blank
- Use standard formats: "1 hour", "30 minutes", "24 hours"

**Costs not calculating**
- Refresh the page
- Check that quantity and cost fields have valid numbers
- Verify MRC and OTC values are entered

**Export not working**
- Ensure project has DR Site data
- Check browser popup blockers
- Try refreshing and exporting again

---

## 🎉 You're Ready!

The DR Site module is now fully functional with all requested features:

✅ **DR environment configuration** (Production DR, Staging DR, etc.)  
✅ **DR location management** (Mumbai DR Center, Bangalore Backup Site)  
✅ **RPO/RTO specifications** (Recovery Point/Time Objectives)  
✅ **DR hosting components** (DR-specific infrastructure)  
✅ **Separate dataset from primary DC** (Independent data model)  

Start by exploring the sample DR data, then create your own disaster recovery configurations for your projects!

---

**Need help?** Refer to the main USER_GUIDE.md or contact your system administrator.