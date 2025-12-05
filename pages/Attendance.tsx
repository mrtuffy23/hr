import React, { useState, useEffect } from 'react';
import { MapPin, Clock, AlertTriangle } from 'lucide-react';
import { AttendanceRecord, Role } from '../types';
import { MOCK_ATTENDANCE } from '../services/mockData';

const Attendance: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [history, setHistory] = useState<AttendanceRecord[]>(MOCK_ATTENDANCE);
  const [loadingLoc, setLoadingLoc] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getLocation = () => {
    setLoadingLoc(true);
    setLocationError(null);
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setLoadingLoc(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLoadingLoc(false);
      },
      (error) => {
        setLocationError('Unable to retrieve your location. Please enable permissions.');
        setLoadingLoc(false);
      }
    );
  };

  const handleAttendance = () => {
    if (!location) {
      getLocation();
      return; // Wait for user to click again after location found or auto-trigger logic
    }

    const now = new Date();
    
    if (!isClockedIn) {
      // Clock In
      const newRecord: AttendanceRecord = {
        id: `ATT-${Date.now()}`,
        employeeId: 'EMP-CURRENT',
        date: now.toISOString().split('T')[0],
        clockIn: now.toISOString(),
        locationIn: location,
        status: now.getHours() > 9 ? 'Late' : 'Present'
      };
      setHistory([newRecord, ...history]);
      setIsClockedIn(true);
    } else {
      // Clock Out - Update latest record
      const updatedHistory = [...history];
      if (updatedHistory.length > 0 && updatedHistory[0].employeeId === 'EMP-CURRENT' && !updatedHistory[0].clockOut) {
          updatedHistory[0].clockOut = now.toISOString();
          setHistory(updatedHistory);
      }
      setIsClockedIn(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center p-8 bg-white shadow-sm rounded-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </h2>
        <p className="mt-2 text-gray-500">{currentTime.toDateString()}</p>

        <div className="mt-8 text-center">
            {locationError && (
                <div className="flex items-center justify-center mb-4 text-sm text-red-500">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    {locationError}
                </div>
            )}
            
            {location && (
                <div className="flex items-center justify-center mb-4 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <MapPin className="w-4 h-4 mr-2" />
                    Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
                </div>
            )}

            {!location && !loadingLoc && (
                <button 
                    onClick={getLocation} 
                    className="mb-4 text-sm text-blue-600 underline"
                >
                    Get Location to Enable Button
                </button>
            )}

            <button
                onClick={handleAttendance}
                disabled={!location && !isClockedIn} // Simplify logic: need loc to clock in
                className={`w-48 h-48 rounded-full flex flex-col items-center justify-center shadow-lg transform transition-all active:scale-95 ${
                isClockedIn
                    ? 'bg-red-500 hover:bg-red-600 ring-4 ring-red-200'
                    : 'bg-blue-600 hover:bg-blue-700 ring-4 ring-blue-200'
                } ${(loadingLoc || (!location && !isClockedIn)) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <div className="text-white">
                    {loadingLoc ? (
                        <span className="text-xl font-bold animate-pulse">Locating...</span>
                    ) : (
                        <>
                            <Clock className="w-12 h-12 mx-auto mb-2" />
                            <span className="text-xl font-bold uppercase tracking-wider">
                                {isClockedIn ? 'Clock Out' : 'Clock In'}
                            </span>
                        </>
                    )}
                </div>
            </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">My Attendance History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Clock In</th>
                <th className="px-6 py-3 font-medium">Clock Out</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {history.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">{record.date}</td>
                  <td className="px-6 py-3 text-gray-500">
                    {new Date(record.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-6 py-3 text-gray-500">
                    {record.clockOut 
                        ? new Date(record.clockOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                        : '-'}
                  </td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      record.status === 'Present' ? 'bg-green-100 text-green-700' :
                      record.status === 'Late' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;