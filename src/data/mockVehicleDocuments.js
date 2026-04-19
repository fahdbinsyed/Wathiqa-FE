// Mock Vehicle Documents Data
import { addDays, subDays } from 'date-fns';

const today = new Date();

export const mockVehicleDocuments = [
  // VEH001 documents (Toyota Camry - Riyadh)
  {
    documentId: "VDC001",
    vehicleId: "VEH001",
    documentType: "Istimara",
    documentNumber: "IST-001-2024",
    issueDate: "2024-01-15",
    expiryDate: addDays(today, 365),
    issuingAuthority: "Saudi Traffic Department",
    documentFile: "istimara_veh001.pdf",
    notes: "Vehicle registration certificate",
    branchId: "BR001",
    branchName: "Riyadh"
  },
  {
    documentId: "VDC002",
    vehicleId: "VEH001",
    documentType: "Insurance",
    documentNumber: "INS-VEH001-2024",
    issueDate: "2024-01-01",
    expiryDate: addDays(today, 365),
    issuingAuthority: "Tawuniya Insurance",
    documentFile: "insurance_veh001.pdf",
    notes: "Comprehensive vehicle insurance",
    branchId: "BR001",
    branchName: "Riyadh"
  },
  {
    documentId: "VDC003",
    vehicleId: "VEH001",
    documentType: "Pollution Certificate",
    documentNumber: "POL-001-2024",
    issueDate: "2024-02-01",
    expiryDate: addDays(today, 180),
    issuingAuthority: "Saudi Environment Agency",
    documentFile: "pollution_veh001.pdf",
    notes: "Vehicle pollution test certificate",
    branchId: "BR001",
    branchName: "Riyadh"
  },

  // VEH002 documents (Honda CR-V - Riyadh)
  {
    documentId: "VDC004",
    vehicleId: "VEH002",
    documentType: "Istimara",
    documentNumber: "IST-002-2024",
    issueDate: "2024-03-10",
    expiryDate: addDays(today, 330),
    issuingAuthority: "Saudi Traffic Department",
    documentFile: "istimara_veh002.pdf",
    notes: "Vehicle registration",
    branchId: "BR001",
    branchName: "Riyadh"
  },
  {
    documentId: "VDC005",
    vehicleId: "VEH002",
    documentType: "Insurance",
    documentNumber: "INS-VEH002-2024",
    issueDate: "2024-03-01",
    expiryDate: addDays(today, 330),
    issuingAuthority: "AXA Insurance",
    documentFile: "insurance_veh002.pdf",
    notes: "Vehicle insurance coverage",
    branchId: "BR001",
    branchName: "Riyadh"
  },

  // VEH003 documents (Ford F-150 - Dammam)
  {
    documentId: "VDC006",
    vehicleId: "VEH003",
    documentType: "Istimara",
    documentNumber: "IST-003-2023",
    issueDate: "2023-08-20",
    expiryDate: addDays(today, 120),
    issuingAuthority: "Saudi Traffic Department",
    documentFile: "istimara_veh003.pdf",
    notes: "Truck registration",
    branchId: "BR002",
    branchName: "Dammam"
  },
  {
    documentId: "VDC007",
    vehicleId: "VEH003",
    documentType: "Insurance",
    documentNumber: "INS-VEH003-2023",
    issueDate: "2023-08-01",
    expiryDate: addDays(today, 120),
    issuingAuthority: "Bupa Insurance",
    documentFile: "insurance_veh003.pdf",
    notes: "Commercial vehicle insurance",
    branchId: "BR002",
    branchName: "Dammam"
  },
  {
    documentId: "VDC008",
    vehicleId: "VEH003",
    documentType: "Pollution Certificate",
    documentNumber: "POL-003-2023",
    issueDate: "2023-09-01",
    expiryDate: subDays(today, 15),
    issuingAuthority: "Saudi Environment Agency",
    documentFile: "pollution_veh003.pdf",
    notes: "Pollution certificate expired",
    branchId: "BR002",
    branchName: "Dammam"
  },

  // VEH004 documents (Mercedes Sprinter - Jeddah)
  {
    documentId: "VDC009",
    vehicleId: "VEH004",
    documentType: "Istimara",
    documentNumber: "IST-004-2024",
    issueDate: "2024-01-20",
    expiryDate: addDays(today, 345),
    issuingAuthority: "Saudi Traffic Department",
    documentFile: "istimara_veh004.pdf",
    notes: "Van registration",
    branchId: "BR003",
    branchName: "Jeddah"
  },
  {
    documentId: "VDC010",
    vehicleId: "VEH004",
    documentType: "Insurance",
    documentNumber: "INS-VEH004-2024",
    issueDate: "2024-01-01",
    expiryDate: addDays(today, 345),
    issuingAuthority: "Medgulf Insurance",
    documentFile: "insurance_veh004.pdf",
    notes: "Commercial van insurance",
    branchId: "BR003",
    branchName: "Jeddah"
  },

  // VEH005 documents (Nissan Altima - Al Qassim)
  {
    documentId: "VDC011",
    vehicleId: "VEH005",
    documentType: "Istimara",
    documentNumber: "IST-005-2024",
    issueDate: "2024-02-15",
    expiryDate: addDays(today, 320),
    issuingAuthority: "Saudi Traffic Department",
    documentFile: "istimara_veh005.pdf",
    notes: "Sedan registration",
    branchId: "BR004",
    branchName: "Al Qassim"
  },
  {
    documentId: "VDC012",
    vehicleId: "VEH005",
    documentType: "Insurance",
    documentNumber: "INS-VEH005-2024",
    issueDate: "2024-02-01",
    expiryDate: addDays(today, 320),
    issuingAuthority: "Tawuniya Insurance",
    documentFile: "insurance_veh005.pdf",
    notes: "Vehicle insurance",
    branchId: "BR004",
    branchName: "Al Qassim"
  },
  {
    documentId: "VDC013",
    vehicleId: "VEH005",
    documentType: "Pollution Certificate",
    documentNumber: "POL-005-2024",
    issueDate: "2024-03-01",
    expiryDate: addDays(today, 150),
    issuingAuthority: "Saudi Environment Agency",
    documentFile: "pollution_veh005.pdf",
    notes: "Pollution test certificate",
    branchId: "BR004",
    branchName: "Al Qassim"
  },

  // VEH006 documents (Chevrolet Tahoe - Dammam)
  {
    documentId: "VDC014",
    vehicleId: "VEH006",
    documentType: "Istimara",
    documentNumber: "IST-006-2023",
    issueDate: "2023-11-10",
    expiryDate: addDays(today, 60),
    issuingAuthority: "Saudi Traffic Department",
    documentFile: "istimara_veh006.pdf",
    notes: "SUV registration - expiring soon",
    branchId: "BR002",
    branchName: "Dammam"
  },
  {
    documentId: "VDC015",
    vehicleId: "VEH006",
    documentType: "Insurance",
    documentNumber: "INS-VEH006-2023",
    issueDate: "2023-11-01",
    expiryDate: addDays(today, 60),
    issuingAuthority: "AXA Insurance",
    documentFile: "insurance_veh006.pdf",
    notes: "SUV insurance - expiring soon",
    branchId: "BR002",
    branchName: "Dammam"
  }
];