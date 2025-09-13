const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Import models
const User = require("./models/User");
const Summary = require("./models/Summary");
const Commercial = require("./models/Commercial");
const DC = require("./models/DC");
const DRSite = require("./models/DRSite");

// Sample data
const sampleUsers = [
  {
    name: "Admin User",
    email: "admin@kpdcl.com",
    password: "admin123",
    role: "Admin",
  },
  {
    name: "Partner User",
    email: "partner@kpdcl.com",
    password: "partner123",
    role: "Partner",
  },
  {
    name: "Customer User",
    email: "customer@kpdcl.com",
    password: "customer123",
    role: "Customer",
  },
];

const sampleSummary = {
  customerName: "Sample Customer Corp",
  partnerName: "KPDCL Partners",
  date: new Date(),
  oppId: "OPP-2024-001",
  status: "Draft",
  totalMRC: 50000,
  totalOTC: 100000,
};

const sampleCommercial = [
  {
    oppId: "OPP-2024-001",
    srNo: 1,
    item: "Cloud Server - Production",
    monthlyPay: 25000,
    otc: 50000,
    description: "High-performance cloud server for production workloads",
    category: "Infrastructure",
  },
  {
    oppId: "OPP-2024-001",
    srNo: 2,
    item: "Database License",
    monthlyPay: 15000,
    otc: 30000,
    description: "Enterprise database license",
    category: "Software",
  },
  {
    oppId: "OPP-2024-001",
    srNo: 3,
    item: "Setup & Configuration",
    monthlyPay: 0,
    otc: 20000,
    description: "Initial setup and configuration services",
    category: "Services",
  },
  {
    oppId: "OPP-2024-001",
    srNo: 4,
    item: "24x7 Support",
    monthlyPay: 10000,
    otc: 0,
    description: "Round-the-clock technical support",
    category: "Support",
  },
];

const sampleDC = [
  {
    oppId: "OPP-2024-001",
    environment: "Production",
    hostingComponents: "Web Server, Application Server, Load Balancer",
    unit: "Virtual Machine",
    costPerUnit: 5000,
    quantity: 2,
    mrc: 15000,
    otc: 25000,
    serverName: "PROD-WEB-01",
    location: "Primary DC",
    specs: {
      vCores: 8,
      ram: "32GB",
      hdd: "500GB SSD",
      os: "Ubuntu 20.04 LTS",
      db: "PostgreSQL 13"
    }
  },
  {
    oppId: "OPP-2024-001",
    environment: "Production",
    hostingComponents: "Database Server, Backup Server",
    unit: "Virtual Machine",
    costPerUnit: 7000,
    quantity: 1,
    mrc: 12000,
    otc: 20000,
    serverName: "PROD-DB-01",
    location: "Primary DC",
    specs: {
      vCores: 16,
      ram: "64GB",
      hdd: "1TB SSD",
      os: "Ubuntu 20.04 LTS",
      db: "PostgreSQL 13 with Replication"
    }
  },
  {
    oppId: "OPP-2024-001",
    environment: "Staging",
    hostingComponents: "Web Server, Application Server",
    unit: "Virtual Machine",
    costPerUnit: 3000,
    quantity: 1,
    mrc: 5000,
    otc: 10000,
    serverName: "STAGE-WEB-01",
    location: "Primary DC",
    specs: {
      vCores: 4,
      ram: "16GB",
      hdd: "250GB SSD",
      os: "Ubuntu 20.04 LTS",
      db: "PostgreSQL 13"
    }
  },
  {
    oppId: "OPP-2024-001",
    environment: "Development",
    hostingComponents: "Development Environment, Testing Tools",
    unit: "Virtual Machine",
    costPerUnit: 2000,
    quantity: 2,
    mrc: 3000,
    otc: 5000,
    serverName: "DEV-ENV-01",
    location: "Secondary DC",
    specs: {
      vCores: 2,
      ram: "8GB",
      hdd: "100GB SSD",
      os: "Ubuntu 20.04 LTS",
      db: "PostgreSQL 13"
    }
  }
];

const sampleDRSite = [
  {
    oppId: "OPP-2024-001",
    environment: "Production DR",
    hostingComponents: "DR Web Server, Database Replica, File Backup",
    unit: "Virtual Machine",
    costPerUnit: 3000,
    quantity: 1,
    mrc: 8000,
    otc: 15000,
    serverName: "DR-WEB-01",
    drLocation: "Mumbai DR Center",
    rpoRto: {
      rpo: "4 hours",
      rto: "2 hours"
    },
    specs: {
      vCores: 4,
      ram: "16GB",
      hdd: "250GB SSD",
      os: "Ubuntu 20.04 LTS",
      db: "PostgreSQL 13 Replica"
    }
  },
  {
    oppId: "OPP-2024-001",
    environment: "Production DR",
    hostingComponents: "DR Database Server, Backup Storage, Monitoring",
    unit: "Virtual Machine",
    costPerUnit: 4000,
    quantity: 1,
    mrc: 10000,
    otc: 18000,
    serverName: "DR-DB-01",
    drLocation: "Mumbai DR Center",
    rpoRto: {
      rpo: "1 hour",
      rto: "30 minutes"
    },
    specs: {
      vCores: 8,
      ram: "32GB",
      hdd: "500GB SSD",
      os: "Ubuntu 20.04 LTS",
      db: "PostgreSQL 13 with Streaming Replication"
    }
  },
  {
    oppId: "OPP-2024-001",
    environment: "Staging DR",
    hostingComponents: "Staging DR Environment, Testing Tools",
    unit: "Virtual Machine",
    costPerUnit: 2000,
    quantity: 1,
    mrc: 3000,
    otc: 8000,
    serverName: "DR-STAGE-01",
    drLocation: "Bangalore Backup Site",
    rpoRto: {
      rpo: "24 hours",
      rto: "4 hours"
    },
    specs: {
      vCores: 2,
      ram: "8GB",
      hdd: "100GB SSD",
      os: "Ubuntu 20.04 LTS",
      db: "PostgreSQL 13"
    }
  }
];

async function setupDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear existing data
    console.log("Clearing existing data...");
    await User.deleteMany({});
    await Summary.deleteMany({});
    await Commercial.deleteMany({});
    await DC.deleteMany({});
    await DRSite.deleteMany({});

    // Create users
    console.log("Creating sample users...");
    const createdUsers = [];
    for (const userData of sampleUsers) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      const user = new User({
        ...userData,
        password: hashedPassword,
      });

      const savedUser = await user.save();
      createdUsers.push(savedUser);
      console.log(`Created user: ${userData.email} (${userData.role})`);
    }

    // Create sample summary
    console.log("Creating sample summary...");
    const adminUser = createdUsers.find((u) => u.role === "Admin");
    const summary = new Summary({
      ...sampleSummary,
      createdBy: adminUser._id,
    });
    await summary.save();
    console.log(`Created summary: ${sampleSummary.oppId}`);

    // Create sample commercial items
    console.log("Creating sample commercial items...");
    for (const commercialData of sampleCommercial) {
      const commercial = new Commercial({
        ...commercialData,
        createdBy: adminUser._id,
      });
      await commercial.save();
      console.log(`Created commercial item: ${commercialData.item}`);
    }

    // Create sample DC items
    console.log("Creating sample DC configurations...");
    for (const dcData of sampleDC) {
      const dc = new DC({
        ...dcData,
        createdBy: adminUser._id,
      });
      await dc.save();
      console.log(`Created DC configuration: ${dcData.serverName} (${dcData.environment})`);
    }

    // Create sample DR Site items
    console.log("Creating sample DR Site configurations...");
    for (const drData of sampleDRSite) {
      const drsite = new DRSite({
        ...drData,
        createdBy: adminUser._id,
      });
      await drsite.save();
      console.log(`Created DR Site configuration: ${drData.serverName} (${drData.environment})`);
    }

    console.log("\n✅ Database setup completed successfully!");
    console.log("\n📋 Sample Login Credentials:");
    console.log("Admin: admin@kpdcl.com / admin123");
    console.log("Partner: partner@kpdcl.com / partner123");
    console.log("Customer: customer@kpdcl.com / customer123");
    console.log("\n🚀 You can now start the application with: npm run dev");
  } catch (error) {
    console.error("❌ Error setting up database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  }
}

// Run setup
setupDatabase();
