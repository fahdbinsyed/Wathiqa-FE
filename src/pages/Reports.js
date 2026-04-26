// pages/Reports.js
import React, { useState, useMemo } from "react";
import { BarChart3, Download } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { useEmployees } from "../hooks/useEmployees";
import { useDocuments } from "../hooks/useDocuments";
import { useSettings } from "../hooks/useSettings";
import { formatDateToDisplay } from "../utils/dateUtils";
import StatusBadge from "../components/StatusBadge";
import "../styles/Reports.css";

const Reports = () => {
  const { employees } = useEmployees();
  const { documents } = useDocuments();
  const { language } = useSettings();
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const translations = {
    en: {
      title: "Reports",
      description: "Generate and view compliance reports",
      allOptions: "All",
      export: "Export Report",
      employee: "Employee",
      documentType: "Document Type",
      expiryDate: "Expiry Date",
      documentStatus: "Status",
      department: "Department",
      totalDocs: "Total Documents",
      validDocs: "Valid Documents",
      expiringDocs: "Expiring Soon",
      expiredDocs: "Expired Documents",
      complianceRate: "Compliance Rate",
      noData: "No documents found matching filters.",
    },
    ar: {
      title: "التقارير",
      description: "إنشاء وعرض تقارير الامتثال",
      allOptions: "الكل",
      export: "تصدير التقرير",
      employee: "الموظف",
      documentType: "نوع المستند",
      expiryDate: "تاريخ انتهاء الصلاحية",
      documentStatus: "الحالة",
      department: "القسم",
      totalDocs: "إجمالي المستندات",
      validDocs: "مستندات صحيحة",
      expiringDocs: "تنتهي قريباً",
      expiredDocs: "منتهية الصلاحية",
      complianceRate: "معدل الامتثال",
      noData: "لم يتم العثور على مستندات تطابق الفلاتر.",
    },
  };

  const t = translations[language] || translations.en;

  // 1. Create a lookup map for employees to avoid O(n^2) lookups in the render loop
  const employeeMap = useMemo(() => {
    return employees.reduce((acc, emp) => {
      acc[emp.employeeId] = emp;
      return acc;
    }, {});
  }, [employees]);

  const departments = useMemo(
    () => [...new Set(employees.map((e) => e.department))],
    [employees],
  );
  const documentTypes = useMemo(
    () => [...new Set(documents.map((d) => d.documentType))],
    [documents],
  );
  const statuses = useMemo(
    () => [...new Set(documents.map((d) => d.status))],
    [documents],
  );

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const emp = employeeMap[doc.employeeId];
      if (typeFilter && doc.documentType !== typeFilter) return false;
      if (statusFilter && doc.status !== statusFilter) return false;
      if (departmentFilter && emp?.department !== departmentFilter)
        return false;
      return true;
    });
  }, [documents, typeFilter, statusFilter, departmentFilter, employeeMap]);

  const complianceSummary = useMemo(() => {
    const total = filteredDocuments.length;
    const valid = filteredDocuments.filter((d) => d.status === "Valid").length;
    return {
      totalDocs: total,
      validDocs: valid,
      expiringDocs: filteredDocuments.filter(
        (d) => d.status === "Expiring Soon",
      ).length,
      expiredDocs: filteredDocuments.filter((d) => d.status === "Expired")
        .length,
      complianceRate: total > 0 ? Math.round((valid / total) * 100) : 0,
    };
  }, [filteredDocuments]);

  const handleExport = () => {
    const headers = [
      t.employee,
      t.department,
      t.documentType,
      t.expiryDate,
      t.documentStatus,
    ];
    const rows = filteredDocuments.map((doc) => {
      const emp = employeeMap[doc.employeeId];
      return [
        `"${emp?.fullName || "Unknown"}"`,
        `"${emp?.department || "Unknown"}"`,
        `"${doc.documentType}"`,
        formatDateToDisplay(doc.expiryDate),
        doc.status,
      ];
    });

    const csvContent = [
      headers.join(","),
      ...rows.map((r) => r.join(",")),
    ].join("\n");
    const blob = new Blob([`\ufeff${csvContent}`], {
      type: "text/csv;charset=utf-8;",
    }); // Added BOM for Excel UTF-8 support
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `Compliance_Report_${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`reports-page ${language === "ar" ? "rtl" : ""}`}>
      <PageHeader
        title={t.title}
        description={t.description}
        icon={BarChart3}
        actions={
          <button
            className="btn btn-primary"
            onClick={handleExport}
            disabled={filteredDocuments.length === 0}
          >
            <Download size={20} />
            {t.export}
          </button>
        }
      />

      <div className="filters-bar">
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">{`${t.allOptions} ${t.department}`}</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">{`${t.allOptions} ${t.documentType}`}</option>
          {documentTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">{`${t.allOptions} ${t.documentStatus}`}</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-label">{t.totalDocs}</div>
          <div className="summary-value">{complianceSummary.totalDocs}</div>
        </div>
        <div className="summary-card success">
          <div className="summary-label">{t.validDocs}</div>
          <div className="summary-value">{complianceSummary.validDocs}</div>
        </div>
        <div className="summary-card warning">
          <div className="summary-label">{t.expiringDocs}</div>
          <div className="summary-value">{complianceSummary.expiringDocs}</div>
        </div>
        <div className="summary-card danger">
          <div className="summary-label">{t.expiredDocs}</div>
          <div className="summary-value">{complianceSummary.expiredDocs}</div>
        </div>
        <div className="summary-card highlight">
          <div className="summary-label">{t.complianceRate}</div>
          <div className="summary-value">
            {complianceSummary.complianceRate}%
          </div>
        </div>
      </div>

      <div className="report-table-wrapper">
        {filteredDocuments.length > 0 ? (
          <table className="report-table">
            <thead>
              <tr>
                <th>{t.employee}</th>
                <th>{t.department}</th>
                <th>{t.documentType}</th>
                <th>{t.expiryDate}</th>
                <th>{t.documentStatus}</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => {
                const emp = employeeMap[doc.employeeId];
                return (
                  <tr key={doc.documentId}>
                    <td className="emp-name">{emp?.fullName || "Unknown"}</td>
                    <td>{emp?.department || "Unknown"}</td>
                    <td>{doc.documentType}</td>
                    <td>{formatDateToDisplay(doc.expiryDate)}</td>
                    <td>
                      <StatusBadge status={doc.status} size="small" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">{t.noData}</div>
        )}
      </div>
    </div>
  );
};

export default Reports;
