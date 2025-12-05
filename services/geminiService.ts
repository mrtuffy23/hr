import { GoogleGenAI } from "@google/genai";
import { Employee, AttendanceRecord, PayrollRecord } from '../types';

// NOTE: In a real app, never expose keys in client-side code without a proxy.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const getHRInsights = async (
  employees: Employee[], 
  attendance: AttendanceRecord[], 
  payroll: PayrollRecord[]
): Promise<string> => {
  if (!apiKey) return "API Key not configured for AI Insights.";

  try {
    const dataContext = JSON.stringify({
      totalEmployees: employees.length,
      activeEmployees: employees.filter(e => e.status === 'Active').length,
      attendanceSample: attendance.slice(0, 5),
      payrollSample: payroll.slice(0, 5),
      payrollTotal: payroll.reduce((acc, curr) => acc + curr.netSalary, 0)
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        Act as a Senior HR Analyst. Analyze the following JSON summary of HR data for "HRPulse".
        
        Data: ${dataContext}
        
        Provide a concise executive summary (max 3 bullet points) covering:
        1. Workforce status.
        2. Attendance/Productivity indicators.
        3. Payroll/Budget efficiency observation.
        
        Format as plain text with simple headers.
      `,
    });

    return response.text || "No insights generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI Service currently unavailable.";
  }
};