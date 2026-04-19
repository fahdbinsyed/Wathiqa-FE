// Mock Company Documents Data
import { addDays, subDays } from 'date-fns';

const today = new Date();

export const mockCompanyDocuments = [
  {
    documentId: "COMP001",
    documentName: "Commercial Registration",
    documentNumber: "CR123456789",
    branchId: "BR001",
    branchName: "Riyadh",
    issueDate: "2020-01-15",
    expiryDate: addDays(today, 365),
    hasExpiry: true,
    status: "Valid",
    documentFile: "cr_riyadh_001.pdf",
    notes: "Main commercial registration"
  },
  {
    documentId: "COMP002",
    documentName: "VAT Certificate",
    documentNumber: "VAT987654321",
    branchId: "BR001",
    branchName: "Riyadh",
    issueDate: "2023-06-01",
    expiryDate: addDays(today, 180),
    hasExpiry: true,
    status: "Valid",
    documentFile: "vat_riyadh_001.pdf",
    notes: "VAT registration certificate"
  },
  {
    documentId: "COMP003",
    documentName: "Trade License",
    documentNumber: "TL456789123",
    branchId: "BR002",
    branchName: "Dammam",
    issueDate: "2022-03-10",
    expiryDate: addDays(today, 90),
    hasExpiry: true,
    status: "Expiring Soon",
    documentFile: "trade_dammam_001.pdf",
    notes: "Trade license for Dammam branch"
  },
  {
    documentId: "COMP004",
    documentName: "Zakat Certificate",
    documentNumber: "ZAK789123456",
    branchId: "BR003",
    branchName: "Jeddah",
    issueDate: "2023-01-01",
    expiryDate: addDays(today, 270),
    hasExpiry: true,
    status: "Valid",
    documentFile: "zakat_jeddah_001.pdf",
    notes: "Zakat exemption certificate"
  },
  {
    documentId: "COMP005",
    documentName: "Commercial Registration",
    documentNumber: "CR234567890",
    branchId: "BR002",
    branchName: "Dammam",
    issueDate: "2021-08-20",
    expiryDate: subDays(today, 30),
    hasExpiry: true,
    status: "Expired",
    documentFile: "cr_dammam_001.pdf",
    notes: "Branch commercial registration - expired"
  },
  {
    documentId: "COMP006",
    documentName: "VAT Certificate",
    documentNumber: "VAT876543210",
    branchId: "BR004",
    branchName: "Al Qassim",
    issueDate: "2023-09-15",
    expiryDate: addDays(today, 200),
    hasExpiry: true,
    status: "Valid",
    documentFile: "vat_qassim_001.pdf",
    notes: "VAT certificate for Al Qassim branch"
  },
  {
    documentId: "COMP007",
    documentName: "Trade License",
    documentNumber: "TL567890123",
    branchId: "BR003",
    branchName: "Jeddah",
    issueDate: "2023-11-01",
    expiryDate: addDays(today, 150),
    hasExpiry: true,
    status: "Valid",
    documentFile: "trade_jeddah_001.pdf",
    notes: "Updated trade license"
  },
  {
    documentId: "COMP008",
    documentName: "Zakat Certificate",
    documentNumber: "ZAK890123456",
    branchId: "BR001",
    branchName: "Riyadh",
    issueDate: "2024-01-01",
    expiryDate: addDays(today, 365),
    hasExpiry: true,
    status: "Valid",
    documentFile: "zakat_riyadh_001.pdf",
    notes: "Annual zakat certificate"
  }
];