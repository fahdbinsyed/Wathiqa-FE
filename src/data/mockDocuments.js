// Mock Documents Data
import { addDays, subDays } from 'date-fns';

const today = new Date();

export const mockDocuments = [
  // Ahmed Khan documents
  {
    documentId: "DOC001",
    employeeId: "EMP001",
    documentType: "Iqama",
    documentNumber: "1234567890",
    issueDate: "2020-01-15",
    expiryDate: addDays(today, 20),
    issuingAuthority: "Saudi MOI",
    documentFile: "iqama_ahmed_001.pdf",
    notes: "Iqama renewing soon",
    branchId: "BR001",
    branchName: "Riyadh"
  },
  {
    documentId: "DOC002",
    employeeId: "EMP001",
    documentType: "Passport",
    documentNumber: "AB123456",
    issueDate: "2019-05-10",
    expiryDate: addDays(today, 5),
    issuingAuthority: "Saudi Ministry of Foreign Affairs",
    documentFile: "passport_ahmed_001.pdf",
    notes: "Passport expires very soon",
    branchId: "BR001",
    branchName: "Riyadh"
  },
  {
    documentId: "DOC003",
    employeeId: "EMP001",
    documentType: "Medical Insurance",
    documentNumber: "INS-2024-001",
    issueDate: "2024-01-01",
    expiryDate: addDays(today, 200),
    issuingAuthority: "AXA Insurance",
    documentFile: "insurance_ahmed_001.pdf",
    notes: "Medical insurance valid",
    branchId: "BR001",
    branchName: "Riyadh"
  },
  {
    documentId: "DOC004",
    employeeId: "EMP001",
    documentType: "Driving License",
    documentNumber: "DL-123456",
    issueDate: "2018-03-20",
    expiryDate: subDays(today, 30),
    issuingAuthority: "Saudi Traffic Department",
    documentFile: "license_ahmed_001.pdf",
    notes: "License expired",
    branchId: "BR001",
    branchName: "Riyadh"
  },
  {
    documentId: "DOC005",
    employeeId: "EMP002",
    documentType: "Iqama",
    documentNumber: "2345678901",
    issueDate: "2019-06-10",
    expiryDate: addDays(today, 150),
    issuingAuthority: "Saudi MOI",
    documentFile: "iqama_ali_001.pdf",
    notes: "Valid Iqama",
    branchId: "BR002",
    branchName: "Dammam"
  },
  {
    documentId: "DOC006",
    employeeId: "EMP002",
    documentType: "Baladiya Card",
    documentNumber: "BAL-2022-001",
    issueDate: "2022-01-01",
    expiryDate: addDays(today, 180),
    issuingAuthority: "Riyadh Municipality",
    documentFile: "baladiya_ali_001.pdf",
    notes: "Valid Baladiya Card",
    branchId: "BR002",
    branchName: "Dammam"
  },
  {
    documentId: "DOC007",
    employeeId: "EMP002",
    documentType: "Medical Insurance",
    documentNumber: "INS-2024-002",
    issueDate: "2024-01-01",
    expiryDate: subDays(today, 15),
    issuingAuthority: "Bupa Insurance",
    documentFile: "insurance_ali_001.pdf",
    notes: "Insurance expired",
    branchId: "BR002",
    branchName: "Dammam"
  },
  {
    documentId: "DOC008",
    employeeId: "EMP002",
    documentType: "Passport",
    documentNumber: "CD654321",
    issueDate: "2021-03-15",
    expiryDate: addDays(today, 250),
    issuingAuthority: "Saudi Ministry of Foreign Affairs",
    documentFile: "passport_ali_001.pdf",
    notes: "Valid passport",
    branchId: "BR002",
    branchName: "Dammam"
  },
  
  // Omar Farooq documents
  {
    documentId: "DOC009",
    employeeId: "EMP003",
    documentType: "Iqama",
    documentNumber: "5555666677",
    issueDate: "2021-02-20",
    expiryDate: addDays(today, 45),
    issuingAuthority: "Saudi MOI",
    documentFile: "iqama_omar_001.pdf",
    notes: "Iqama expiring in 45 days",
    branchId: "BR001",
    branchName: "Riyadh"
  },
  {
    documentId: "DOC010",
    employeeId: "EMP003",
    documentType: "Visa Copy",
    documentNumber: "VISA-001",
    issueDate: "2023-01-15",
    expiryDate: addDays(today, 35),
    issuingAuthority: "Saudi MOI",
    documentFile: "visa_omar_001.pdf",
    notes: "Work visa expiring soon",
    branchId: "BR001",
    branchName: "Riyadh"
  },
  {
    documentId: "DOC011",
    employeeId: "EMP003",
    documentType: "Contract Copy",
    documentNumber: "CTR-EMP003-001",
    issueDate: "2021-02-20",
    expiryDate: addDays(today, 500),
    issuingAuthority: "Company HR",
    documentFile: "contract_omar_001.pdf",
    notes: "Employment contract",
    branchId: "BR001",
    branchName: "Riyadh"
  },
  {
    documentId: "DOC012",
    employeeId: "EMP003",
    documentType: "Medical Insurance",
    documentNumber: "INS-2024-003",
    issueDate: "2024-01-01",
    expiryDate: addDays(today, 270),
    issuingAuthority: "Medgulf Insurance",
    documentFile: "insurance_omar_001.pdf",
    notes: "Valid medical insurance",
    branchId: "BR001",
    branchName: "Riyadh"
  },
  
  // Yusuf Ali documents
  {
    documentId: "DOC013",
    employeeId: "EMP004",
    documentType: "Iqama",
    documentNumber: "1111222233",
    issueDate: "2019-09-01",
    expiryDate: addDays(today, 150),
    issuingAuthority: "Saudi MOI",
    documentFile: "iqama_yusuf_001.pdf",
    notes: "Valid Iqama",
    branchId: "BR003",
    branchName: "Jeddah"
  },
  {
    documentId: "DOC014",
    employeeId: "EMP004",
    documentType: "Passport",
    documentNumber: "EF987654",
    issueDate: "2018-07-10",
    expiryDate: subDays(today, 60),
    issuingAuthority: "Egyptian Ministry of Foreign Affairs",
    documentFile: "passport_yusuf_001.pdf",
    notes: "Passport expired",
    branchId: "BR003",
    branchName: "Jeddah"
  },
  {
    documentId: "DOC015",
    employeeId: "EMP004",
    documentType: "Baladiya Card",
    documentNumber: "BAL-2023-456",
    issueDate: "2023-01-01",
    expiryDate: addDays(today, 180),
    issuingAuthority: "Riyadh Municipality",
    documentFile: "baladiya_yusuf_001.pdf",
    notes: "Valid Baladiya Card",
    branchId: "BR003",
    branchName: "Jeddah"
  },
  {
    documentId: "DOC016",
    employeeId: "EMP004",
    documentType: "Medical Insurance",
    documentNumber: "INS-2024-004",
    issueDate: "2024-01-01",
    expiryDate: addDays(today, 300),
    issuingAuthority: "AXA Insurance",
    documentFile: "insurance_yusuf_001.pdf",
    notes: "Valid medical insurance",
    branchId: "BR003",
    branchName: "Jeddah"
  },
  {
    documentId: "DOC017",
    employeeId: "EMP004",
    documentType: "Driving License",
    documentNumber: "DL-987654",
    issueDate: "2020-09-01",
    expiryDate: addDays(today, 120),
    issuingAuthority: "Saudi Traffic Department",
    documentFile: "license_yusuf_001.pdf",
    notes: "Valid driving license",
    branchId: "BR003",
    branchName: "Jeddah"
  },
  
  // Ibrahim Malik documents
  {
    documentId: "DOC018",
    employeeId: "EMP005",
    documentType: "Iqama",
    documentNumber: "3333444455",
    issueDate: "2020-11-15",
    expiryDate: addDays(today, 200),
    issuingAuthority: "Saudi MOI",
    documentFile: "iqama_ibrahim_001.pdf",
    notes: "Valid Iqama",
    branchId: "BR002",
    branchName: "Dammam"
  },
  {
    documentId: "DOC019",
    employeeId: "EMP005",
    documentType: "Medical Insurance",
    documentNumber: "INS-2024-005",
    issueDate: "2024-01-01",
    expiryDate: addDays(today, 280),
    issuingAuthority: "Bupa Insurance",
    documentFile: "insurance_ibrahim_001.pdf",
    notes: "Valid medical insurance",
    branchId: "BR002",
    branchName: "Dammam"
  },
  {
    documentId: "DOC020",
    employeeId: "EMP005",
    documentType: "Passport",
    documentNumber: "GH456789",
    issueDate: "2022-06-10",
    expiryDate: addDays(today, 310),
    issuingAuthority: "Saudi Ministry of Foreign Affairs",
    documentFile: "passport_ibrahim_001.pdf",
    notes: "Valid passport",
    branchId: "BR002",
    branchName: "Dammam"
  },
  
  // Fatima Al-Dosari documents
  {
    documentId: "DOC021",
    employeeId: "EMP006",
    documentType: "Iqama",
    documentNumber: "6666777788",
    issueDate: "2021-05-10",
    expiryDate: addDays(today, 100),
    issuingAuthority: "Saudi MOI",
    documentFile: "iqama_fatima_001.pdf",
    notes: "Valid Iqama",
    branchId: "BR001",
    branchName: "Riyadh"
  },
  {
    documentId: "DOC022",
    employeeId: "EMP006",
    documentType: "Medical Insurance",
    documentNumber: "INS-2024-006",
    issueDate: "2024-01-01",
    expiryDate: addDays(today, 220),
    issuingAuthority: "Medgulf Insurance",
    documentFile: "insurance_fatima_001.pdf",
    notes: "Valid medical insurance",
    branchId: "BR001",
    branchName: "Riyadh"
  },
  {
    documentId: "DOC023",
    employeeId: "EMP006",
    documentType: "Baladiya Card",
    documentNumber: "BAL-2024-789",
    issueDate: "2024-01-01",
    expiryDate: addDays(today, 365),
    issuingAuthority: "Riyadh Municipality",
    documentFile: "baladiya_fatima_001.pdf",
    notes: "New Baladiya Card",
    branchId: "BR001",
    branchName: "Riyadh"
  },
  
  // Hana Al-Sharif documents
  {
    documentId: "DOC024",
    employeeId: "EMP007",
    documentType: "Iqama",
    documentNumber: "4444555566",
    issueDate: "2019-03-01",
    expiryDate: addDays(today, 25),
    issuingAuthority: "Saudi MOI",
    documentFile: "iqama_hana_001.pdf",
    notes: "Iqama renewing soon",
    branchId: "BR004",
    branchName: "Al Qassim"
  },
  {
    documentId: "DOC025",
    employeeId: "EMP007",
    documentType: "Passport",
    documentNumber: "IJ123456",
    issueDate: "2019-04-15",
    expiryDate: addDays(today, 150),
    issuingAuthority: "Saudi Ministry of Foreign Affairs",
    documentFile: "passport_hana_001.pdf",
    notes: "Valid passport",
    branchId: "BR004",
    branchName: "Al Qassim"
  },
  {
    documentId: "DOC026",
    employeeId: "EMP007",
    documentType: "Medical Insurance",
    documentNumber: "INS-2024-007",
    issueDate: "2024-01-01",
    expiryDate: addDays(today, 290),
    issuingAuthority: "AXA Insurance",
    documentFile: "insurance_hana_001.pdf",
    notes: "Valid medical insurance",
    branchId: "BR004",
    branchName: "Al Qassim"
  },
  
  // Mohammed Saeed documents
  {
    documentId: "DOC027",
    employeeId: "EMP008",
    documentType: "Iqama",
    documentNumber: "7777888899",
    issueDate: "2020-07-22",
    expiryDate: addDays(today, 80),
    issuingAuthority: "Saudi MOI",
    documentFile: "iqama_mohammed_001.pdf",
    notes: "Valid Iqama",
    branchId: "BR001",
    branchName: "Riyadh"
  },
  {
    documentId: "DOC028",
    employeeId: "EMP008",
    documentType: "Visa Copy",
    documentNumber: "VISA-002",
    issueDate: "2022-08-20",
    expiryDate: subDays(today, 10),
    issuingAuthority: "Saudi MOI",
    documentFile: "visa_mohammed_001.pdf",
    notes: "Work visa expired",
    branchId: "BR001",
    branchName: "Riyadh"
  },
  {
    documentId: "DOC029",
    employeeId: "EMP008",
    documentType: "Medical Insurance",
    documentNumber: "INS-2024-008",
    issueDate: "2024-01-01",
    expiryDate: addDays(today, 260),
    issuingAuthority: "Bupa Insurance",
    documentFile: "insurance_mohammed_001.pdf",
    notes: "Valid medical insurance",
    branchId: "BR001",
    branchName: "Riyadh"
  },
  
  // Noor Hassan documents
  {
    documentId: "DOC030",
    employeeId: "EMP009",
    documentType: "Iqama",
    documentNumber: "9999000011",
    issueDate: "2022-01-10",
    expiryDate: addDays(today, 250),
    issuingAuthority: "Saudi MOI",
    documentFile: "iqama_noor_001.pdf",
    notes: "Valid Iqama",
    branchId: "BR004",
    branchName: "Al Qassim"
  },
  {
    documentId: "DOC031",
    employeeId: "EMP009",
    documentType: "Medical Insurance",
    documentNumber: "INS-2024-009",
    issueDate: "2024-01-01",
    expiryDate: addDays(today, 310),
    issuingAuthority: "Medgulf Insurance",
    documentFile: "insurance_noor_001.pdf",
    notes: "Valid medical insurance",
    branchId: "BR004",
    branchName: "Al Qassim"
  },
  {
    documentId: "DOC032",
    employeeId: "EMP009",
    documentType: "Contract Copy",
    documentNumber: "CTR-EMP009-001",
    issueDate: "2022-01-10",
    expiryDate: addDays(today, 500),
    issuingAuthority: "Company HR",
    documentFile: "contract_noor_001.pdf",
    notes: "Employment contract",
    branchId: "BR004",
    branchName: "Al Qassim"
  }
];
