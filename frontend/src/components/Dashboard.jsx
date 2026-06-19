import { useState } from 'react';
import { Plus, Search, Check, Printer, X } from 'lucide-react';
import Layout from './Layout';

const active = [
  { id: 1, pid: 'P001', patientName: 'John Doe', tokenNumber: 1, assignedDoctorName: 'Dr. Amit Sharma', specialization: 'Cardiology', appointmentTime: '09:00 AM', status: 'Waiting', createdAt: '2026-06-18 09:00', isFollowUp: false },
  { id: 2, pid: 'P002', patientName: 'Jane Smith', tokenNumber: 2, assignedDoctorName: 'Dr. Priya Verma', specialization: 'General Medicine', appointmentTime: '09:30 AM', status: 'Scheduled', createdAt: '2026-06-18 09:30', isFollowUp: false },
  { id: 3, pid: 'P004', patientName: 'Priya Nair', tokenNumber: 3, assignedDoctorName: 'Dr. Amit Sharma', specialization: 'Cardiology', appointmentTime: '10:00 AM', status: 'Scheduled', createdAt: '2026-06-18 10:00', isFollowUp: false },
  { id: 4, pid: 'P005', patientName: 'Suresh Rao', tokenNumber: 4, assignedDoctorName: 'Dr. Amit Sharma', specialization: 'Cardiology', appointmentTime: '11:00 AM', status: 'Scheduled', createdAt: '2026-06-18 11:00', isFollowUp: false },
  { id: 5, pid: 'P001', patientName: 'John Doe', tokenNumber: 4, assignedDoctorName: 'Dr. Amit Sharma', specialization: 'Cardiology', appointmentTime: '10:30 AM', status: 'Scheduled', createdAt: '2026-06-18 10:30', isFollowUp: false },
];

const statusColors = {
  Scheduled: 'bg-blue-100 text-blue-600 border-blue-200',
  Waiting: 'bg-amber-100 text-amber-600 border-amber-200',
  'In Progress': 'bg-green-100 text-green-700 border-green-200',
  Completed: 'bg-gray-100 text-gray-600 border-gray-200',
  'Follow-up': 'bg-purple-100 text-purple-700 border-purple-200',
};

const existingPatients = [
  { pid: 'P001', name: 'John Doe', phone: '9001234567', lastVisit: '2026-06-18' },
  { pid: 'P002', name: 'Jane Smith', phone: '9002345678', lastVisit: '2026-06-18' },
  { pid: 'P003', name: 'Ravi Kumar', phone: '9003456789', lastVisit: '2026-06-01' },
  { pid: 'P004', name: 'Priya Nair', phone: '9004567890', lastVisit: '2026-04-10' },
  { pid: 'P005', name: 'Suresh Rao', phone: '9005678901', lastVisit: '2026-06-05' },
];

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM',
];

const specializationsList = ['Cardiology', 'Neurology', 'Orthopedics', 'Dermatology', 'Pediatrics', 'General Medicine'];

const doctors = [
  { name: 'Dr. Amit Sharma', specialization: 'Cardiology' },
  { name: 'Dr. Smith', specialization: 'Cardiology' },
  { name: 'Dr. Priya Verma', specialization: 'General Medicine' },
  { name: 'Dr. Adams', specialization: 'Neurology' },
  { name: 'Dr. Brown', specialization: 'Orthopedics' },
  { name: 'Dr. Davis', specialization: 'Dermatology' },
  { name: 'Dr. Miller', specialization: 'Pediatrics' },
];

const bloodGroupsList = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function ManagerDashboard({ role }) {
  const [search, setSearch] = useState('');
  const [appointments, setAppointments] = useState(active);
  const [showModal, setShowModal] = useState(false);
  const [isNewAppointmentWizard, setIsNewAppointmentWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [patientMode, setPatientMode] = useState('new');
  const [existingPatientSearch, setExistingPatientSearch] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const [newAppointmentData, setNewAppointmentData] = useState({
    id: null,
    pid: '',
    patientName: '',
    dob: '',
    phone: '',
    email: '',
    gender: 'Male',
    bloodGroup: 'O+',
    address: '',
    specialization: specializationsList[0],
    assignedDoctorName: doctors.filter(d => d.specialization === specializationsList[0])[0]?.name || '',
    appointmentDate: new Date().toISOString().slice(0, 10),
    appointmentTime: '9:00 AM',
    paymentMethod: 'Cash',
    tokenNumber: null,
  });

  const filtered = appointments.filter((a) => {
    const query = search.toLowerCase();
    return (
      a.pid.toLowerCase().includes(query) ||
      a.patientName.toLowerCase().includes(query) ||
      a.assignedDoctorName.toLowerCase().includes(query) ||
      a.specialization.toLowerCase().includes(query) ||
      a.tokenNumber.toString().includes(query)
    );
  });

  const openNewAppointmentModal = () => {
    const date = new Date().toISOString().slice(0, 10);
    const initialDocs = doctors.filter(d => d.specialization === specializationsList[0]);
    setNewAppointmentData({
      id: Date.now(),
      pid: `P00${appointments.length + 1}`,
      patientName: '',
      dob: '',
      phone: '',
      email: '',
      gender: 'Male',
      bloodGroup: 'O+',
      address: '',
      specialization: specializationsList[0],
      assignedDoctorName: initialDocs.length > 0 ? initialDocs[0].name : '',
      appointmentDate: date,
      appointmentTime: '9:00 AM',
      paymentMethod: 'Cash',
      tokenNumber: null,
    });
    setPatientMode('new');
    setWizardStep(1);
    setIsNewAppointmentWizard(true);
    setShowModal(true);
    setErrorMsg('');
  };

  const handleNext = () => {
    setErrorMsg('');
    if (wizardStep === 1) {
      if (patientMode === 'new') {
        const { patientName, phone, dob, email, address, bloodGroup, gender } = newAppointmentData;
        if (!patientName || !phone || !dob || !email || !address || !bloodGroup || !gender) {
          setErrorMsg('All fields are required for new registration.');
          return;
        }
        if (!/^[6-9]\d{9}$/.test(phone)) {
          setErrorMsg('Enter a valid 10 digit mobile number.');
          return;
        }
      } else {
        if (!newAppointmentData.pid) {
          setErrorMsg('Please select an existing patient from the list.');
          return;
        }
      }
      setWizardStep(2);
    } else if (wizardStep === 2) {
      if (!newAppointmentData.specialization || !newAppointmentData.appointmentDate || !newAppointmentData.appointmentTime) {
        setErrorMsg('Please fill all scheduling details.');
        return;
      }
      setWizardStep(3);
    } else if (wizardStep === 3) {
      saveNewAppointment();
    }
  };

  const saveNewAppointment = () => {
    const newToken = appointments.length + 1;
    setNewAppointmentData(prev => ({ ...prev, tokenNumber: newToken }));

    setAppointments((prev) => [
      ...prev,
      {
        id: newAppointmentData.id,
        pid: newAppointmentData.pid,
        patientName: newAppointmentData.patientName,
        tokenNumber: newToken,
        assignedDoctorName: newAppointmentData.assignedDoctorName,
        specialization: newAppointmentData.specialization,
        appointmentTime: newAppointmentData.appointmentTime,
        status: 'Scheduled',
        createdAt: `${newAppointmentData.appointmentDate} ${newAppointmentData.appointmentTime}`,
        isFollowUp: false,
      },
    ]);
    setWizardStep(4);
  };

  const availableDoctors = doctors.filter(
    (doctor) => doctor.specialization === newAppointmentData.specialization
  );

  return (
    <Layout>
      <div className="p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">
              {new Date().toLocaleDateString('en-GB', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <button
            onClick={openNewAppointmentModal}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> New Appointment
          </button>
        </div>

        {/* Appointments Table */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            <div className="flex items-center gap-3 w-full max-w-md text-gray-400 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
              <Search className="w-4 h-4" />
              <input
                placeholder="Search by token, PID, name or doctor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-sm focus:outline-none text-gray-700 bg-transparent"
              />
            </div>
            <span className="text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
              {filtered.length} Appointments
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  {['Token', 'PID', 'Patient Name', 'Doctor', 'Specialization', 'Time', 'Status'].map((h) => (
                    <th key={h} className="px-5 py-4 text-left font-semibold text-gray-500 text-xs uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} className="border-b border-gray-50 hover:bg-blue-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="text-gray-900 font-medium">#{a.tokenNumber}</div>
                    </td>
                    <td className="px-5 py-4 text-gray-500 font-medium">{a.pid}</td>
                    <td className="px-5 py-4 text-gray-900 font-medium">{a.patientName}</td>
                    <td className="px-5 py-4 text-gray-600">{a.assignedDoctorName}</td>
                    <td className="px-5 py-4 text-gray-500">{a.specialization}</td>
                    <td className="px-5 py-4">
                      <div className="text-gray-900 font-medium">{a.appointmentTime}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{a.createdAt.split(' ')[0]}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[a.status]}`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center text-gray-400 bg-gray-50/30">
                      <div className="flex flex-col items-center justify-center">
                        <Search className="w-8 h-8 mb-3 text-gray-300" />
                        <p>No appointments found matching your criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL WIZARD */}
        {showModal && isNewAppointmentWizard && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh]">
              
              {/* Modal Header */}
              <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">
                  New Appointment — {wizardStep === 1 ? 'Patient Details' : wizardStep === 2 ? 'Doctor Scheduling' : wizardStep === 3 ? 'Payment' : 'Confirmed'}
                </h2>
                <button 
                  onClick={() => { setShowModal(false); setIsNewAppointmentWizard(false); }} 
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                {wizardStep < 4 && (
                  <>
                    {/* Step Indicator */}
                    <div className="flex items-center gap-4 mb-8 text-sm font-medium">
                      {/* Step 1 */}
                      <div className="flex items-center gap-2">
                        {wizardStep > 1 ? (
                          <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center">
                            <Check className="w-3.5 h-3.5" strokeWidth={3} />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm">
                            1
                          </div>
                        )}
                        <span className={wizardStep >= 1 ? "text-gray-900 font-semibold" : "text-gray-400"}>Patient Details</span>
                      </div>
                      
                      <div className="w-12 h-px bg-gray-200"></div>
                      
                      {/* Step 2 */}
                      <div className="flex items-center gap-2">
                        {wizardStep > 2 ? (
                          <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center">
                            <Check className="w-3.5 h-3.5" strokeWidth={3} />
                          </div>
                        ) : (
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center shadow-sm ${wizardStep === 2 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                            2
                          </div>
                        )}
                        <span className={wizardStep >= 2 ? "text-gray-900 font-semibold" : "text-gray-400"}>Doctor Scheduling</span>
                      </div>

                      <div className="w-12 h-px bg-gray-200"></div>
                      
                      {/* Step 3 */}
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shadow-sm ${wizardStep === 3 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                          3
                        </div>
                        <span className={wizardStep === 3 ? "text-gray-900 font-semibold" : "text-gray-400"}>Payment</span>
                      </div>
                    </div>

                    {errorMsg && (
                      <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm font-medium rounded-lg border border-red-100 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        {errorMsg}
                      </div>
                    )}
                  </>
                )}

                {wizardStep === 1 && (
                  <div>
                    {/* Toggle New / Existing */}
                    <div className="flex mb-6 bg-gray-50 p-1 rounded-lg w-fit border border-gray-200">
                      <button
                        type="button"
                        onClick={() => { setPatientMode('new'); setErrorMsg(''); }}
                        className={patientMode === 'new' ? 'px-5 py-2 text-sm font-medium rounded-md transition-all bg-white text-blue-700 shadow-sm border border-gray-200/50' : 'px-5 py-2 text-sm font-medium rounded-md transition-all text-gray-600 hover:text-gray-900'}
                      >
                        New Patient
                      </button>
                      <button
                        type="button"
                        onClick={() => { setPatientMode('existing'); setErrorMsg(''); }}
                        className={patientMode === 'existing' ? 'px-5 py-2 text-sm font-medium rounded-md transition-all bg-white text-blue-700 shadow-sm border border-gray-200/50' : 'px-5 py-2 text-sm font-medium rounded-md transition-all text-gray-600 hover:text-gray-900'}
                      >
                        Existing Patient
                      </button>
                    </div>

                    {patientMode === 'new' ? (
                      <div className="grid gap-5 md:grid-cols-2">
                        <label className="space-y-1.5 md:col-span-2">
                          <span className="text-sm font-medium text-gray-700">Full Name</span>
                          <input
                            value={newAppointmentData.patientName}
                            onChange={(e) => setNewAppointmentData({ ...newAppointmentData, patientName: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                          />
                        </label>
                        <label className="space-y-1.5">
                          <span className="text-sm font-medium text-gray-700">Date of Birth</span>
                          <input
                            type="date"
                            max={new Date().toISOString().split('T')[0]}
                            value={newAppointmentData.dob}
                            onChange={(e) => setNewAppointmentData({ ...newAppointmentData, dob: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                          />
                        </label>
                        <label className="space-y-1.5">
                          <span className="text-sm font-medium text-gray-700">Phone</span>
                          <input
                            type="tel"
                            maxLength={10}
                            value={newAppointmentData.phone}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '');
                              setNewAppointmentData({ ...newAppointmentData, phone: val });
                            }}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                          />
                        </label>
                        <label className="space-y-1.5">
                          <span className="text-sm font-medium text-gray-700">Email</span>
                          <input
                            type="email"
                            value={newAppointmentData.email}
                            onChange={(e) => setNewAppointmentData({ ...newAppointmentData, email: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                          />
                        </label>
                        <label className="space-y-1.5">
                          <span className="text-sm font-medium text-gray-700">Gender</span>
                          <select
                            value={newAppointmentData.gender}
                            onChange={(e) => setNewAppointmentData({ ...newAppointmentData, gender: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </label>
                        <label className="space-y-1.5 md:col-span-1">
                          <span className="text-sm font-medium text-gray-700">Blood Group</span>
                          <select
                            value={newAppointmentData.bloodGroup}
                            onChange={(e) => setNewAppointmentData({ ...newAppointmentData, bloodGroup: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                          >
                            <option value="">Select...</option>
                            {bloodGroupsList.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                          </select>
                        </label>
                        <label className="space-y-1.5 md:col-span-2">
                          <span className="text-sm font-medium text-gray-700">Postal Address</span>
                          <textarea
                            rows={3}
                            value={newAppointmentData.address}
                            onChange={(e) => setNewAppointmentData({ ...newAppointmentData, address: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none transition-all"
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="relative">
                          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            value={existingPatientSearch}
                            onChange={(e) => setExistingPatientSearch(e.target.value)}
                            placeholder="Search existing patients by PID or Name..."
                            className="w-full rounded-lg border border-gray-300 pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                          />
                        </div>
                        <div className="rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                          <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200">
                              <tr>
                                <th className="px-5 py-3.5 text-left font-semibold text-gray-600">PID</th>
                                <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Name</th>
                                <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Phone</th>
                                <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Last Visit</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                              {existingPatients
                                .filter((patient) => {
                                  const query = existingPatientSearch.toLowerCase();
                                  return (
                                    patient.pid.toLowerCase().includes(query) ||
                                    patient.name.toLowerCase().includes(query)
                                  );
                                })
                                .map((patient) => {
                                  const isSelected = newAppointmentData.pid === patient.pid;
                                  return (
                                    <tr
                                      key={patient.pid}
                                      onClick={() => {
                                        setNewAppointmentData({
                                          ...newAppointmentData,
                                          pid: patient.pid,
                                          patientName: patient.name,
                                          phone: patient.phone,
                                        });
                                        setErrorMsg('');
                                      }}
                                      className={`cursor-pointer transition-colors ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                                    >
                                      <td className={`px-5 py-4 font-medium ${isSelected ? 'text-blue-700' : 'text-gray-500'}`}>{patient.pid}</td>
                                      <td className={`px-5 py-4 ${isSelected ? 'text-blue-900 font-medium' : 'text-gray-900'}`}>{patient.name}</td>
                                      <td className="px-5 py-4 text-gray-500">{patient.phone}</td>
                                      <td className="px-5 py-4 flex items-center justify-between text-gray-500">
                                        {patient.lastVisit}
                                        {isSelected && (
                                          <span className="text-blue-600 bg-blue-100/50 px-2.5 py-1 rounded text-xs font-semibold">
                                            Selected
                                          </span>
                                        )}
                                      </td>
                                    </tr>
                                  )
                                })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {wizardStep === 2 && (
                  <div>
                    <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50 px-5 py-4 text-sm text-gray-700 flex gap-6 items-center shadow-sm">
                      <div>
                        <span className="text-gray-500 text-xs uppercase tracking-wider block mb-0.5">Patient</span>
                        <span className="font-semibold text-gray-900 text-base">{newAppointmentData.patientName || 'Unknown'}</span>
                      </div>
                      <div className="w-px h-8 bg-blue-200"></div>
                      <div>
                        <span className="text-gray-500 text-xs uppercase tracking-wider block mb-0.5">PID</span>
                        <span className="font-semibold text-gray-900 text-base">{newAppointmentData.pid}</span>
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <label className="space-y-1.5">
                        <span className="text-sm font-medium text-gray-700">Specialization</span>
                        <select
                          value={newAppointmentData.specialization}
                          onChange={(e) => {
                            const newSpec = e.target.value;
                            const availableDocs = doctors.filter(d => d.specialization === newSpec);
                            setNewAppointmentData({
                              ...newAppointmentData,
                              specialization: newSpec,
                              assignedDoctorName: availableDocs.length > 0 ? availableDocs[0].name : ''
                            });
                          }}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        >
                          <option value="">Select specialization...</option>
                          {specializationsList.map((spec) => (
                            <option key={spec} value={spec}>{spec}</option>
                          ))}
                        </select>
                      </label>

                      <label className="space-y-1.5">
                        <span className="text-sm font-medium text-gray-700">Doctor (optional)</span>
                        <select
                          value={newAppointmentData.assignedDoctorName}
                          onChange={(e) =>
                            setNewAppointmentData({
                              ...newAppointmentData,
                              assignedDoctorName: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:bg-gray-50 disabled:text-gray-400"
                          disabled={!newAppointmentData.specialization}
                        >
                          <option value="">Auto-assign (shortest queue)</option>
                          {availableDoctors.map((doctor) => (
                            <option key={doctor.name} value={doctor.name}>{doctor.name}</option>
                          ))}
                        </select>
                      </label>

                      <label className="space-y-1.5 md:col-span-2">
                        <span className="text-sm font-medium text-gray-700">Appointment Date <span className="text-red-500">*</span></span>
                        <input
                          type="date"
                          value={newAppointmentData.appointmentDate}
                          onChange={(e) => setNewAppointmentData({ ...newAppointmentData, appointmentDate: e.target.value })}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                      </label>
                    </div>

                    <div className="space-y-3 mt-8">
                      <span className="text-sm font-medium text-gray-700">Appointment Time Slot <span className="text-red-500">*</span></span>
                      <div className="grid gap-3 grid-cols-3 sm:grid-cols-4 lg:grid-cols-5">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setNewAppointmentData({ ...newAppointmentData, appointmentTime: slot })}
                            className={newAppointmentData.appointmentTime === slot ? 'rounded-lg border px-2 py-3 text-sm font-medium transition-all border-blue-600 text-blue-700 bg-blue-50 shadow-sm ring-1 ring-blue-600' : 'rounded-lg border px-2 py-3 text-sm font-medium transition-all border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {wizardStep === 3 && (
                  <div className="max-w-3xl">
                    <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50 px-5 py-4 text-sm text-gray-700 flex flex-wrap gap-x-8 gap-y-3 items-center shadow-sm">
                      <div>
                        <span className="text-gray-500 text-xs uppercase tracking-wider block mb-0.5">Patient</span>
                        <span className="font-semibold text-gray-900 text-base">{newAppointmentData.patientName}</span>
                      </div>
                      <div className="hidden sm:block w-px h-8 bg-blue-200"></div>
                      <div>
                        <span className="text-gray-500 text-xs uppercase tracking-wider block mb-0.5">Doctor</span>
                        <span className="font-semibold text-gray-900 text-base">{newAppointmentData.assignedDoctorName || 'Auto-assign'}</span>
                      </div>
                      <div className="hidden sm:block w-px h-8 bg-blue-200"></div>
                      <div>
                        <span className="text-gray-500 text-xs uppercase tracking-wider block mb-0.5">Specialization</span>
                        <span className="font-semibold text-gray-900 text-base">{newAppointmentData.specialization}</span>
                      </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden mb-8 shadow-sm">
                      <div className="px-5 py-3.5 bg-gray-50 border-b border-gray-200">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Fee Breakdown</span>
                      </div>
                      <div className="p-5 space-y-4">
                        <div className="flex justify-between text-base text-gray-600">
                          <span>Consultation Fee</span>
                          <span className="font-medium text-gray-900">Rs. 500</span>
                        </div>
                        <div className="flex justify-between text-lg font-semibold text-blue-700 bg-blue-50 p-4 rounded-lg -mx-4">
                          <span>Amount to Collect Now</span>
                          <span>Rs. 500</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="text-sm font-medium text-gray-700">Select Payment Method</div>
                      <div className="grid gap-4 sm:grid-cols-3">
                        {['Cash', 'UPI', 'Card'].map((method) => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setNewAppointmentData({ ...newAppointmentData, paymentMethod: method })}
                            className={newAppointmentData.paymentMethod === method ? 'rounded-lg border-2 px-4 py-4 text-sm font-semibold transition-all border-blue-600 bg-blue-50 text-blue-700 shadow-sm' : 'rounded-lg border-2 px-4 py-4 text-sm font-semibold transition-all border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {wizardStep === 4 && (
                  <div className="py-6">
                    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg mb-8">
                      <div className="bg-green-50 border-b border-green-100 px-6 py-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-green-700 font-bold tracking-wider uppercase mb-1">
                              Payment Successful
                            </p>
                            <h3 className="text-xl font-bold text-gray-900">
                              Appointment Confirmed
                            </h3>
                          </div>

                          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                            <Check className="w-6 h-6 text-white" strokeWidth={3} />
                          </div>
                        </div>
                      </div>

                      <div className="p-6 space-y-4 text-sm">
                        <div className="flex justify-between pb-4 border-b border-gray-100">
                          <span className="text-gray-500">Token No</span>
                          <span className="font-bold text-gray-900 text-lg">
                            #{newAppointmentData.tokenNumber}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-500">Patient</span>
                          <span className="font-medium text-gray-900">
                            {newAppointmentData.patientName}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-500">PID</span>
                          <span className="text-gray-900 font-medium">{newAppointmentData.pid}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-500">Doctor</span>
                          <span className="text-gray-900 font-medium">{newAppointmentData.assignedDoctorName}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-500">Date</span>
                          <span className="text-gray-900 font-medium">{newAppointmentData.appointmentDate}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-500">Time</span>
                          <span className="text-gray-900 font-medium">{newAppointmentData.appointmentTime}</span>
                        </div>

                        <div className="border-t border-gray-100 pt-4 mt-4">
                          <div className="flex justify-between mb-3 text-gray-600">
                            <span>Consultation Fee</span>
                            <span className="font-medium">₹500</span>
                          </div>

                          <div className="flex justify-between text-lg font-bold text-green-700 bg-green-50 p-3 rounded-lg -mx-3">
                            <span>Amount Paid</span>
                            <span>₹500</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                      <button 
                        onClick={() => window.print()}
                        className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-5 py-3 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-all focus:ring-2 focus:ring-gray-200"
                      >
                        <Printer className="w-4 h-4" /> Print Bill
                      </button>
                      <button 
                        onClick={() => { setShowModal(false); setIsNewAppointmentWizard(false); }} 
                        className="flex-1 bg-blue-600 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}

                {/* Modal Footer Controls */}
                {wizardStep < 4 && (
                  <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-5">
                    <button
                      type="button"
                      onClick={() => {
                        if (wizardStep === 1) {
                          setShowModal(false);
                          setIsNewAppointmentWizard(false);
                        } else {
                          setWizardStep((prev) => prev - 1);
                          setErrorMsg('');
                        }
                      }}
                      className="px-6 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all focus:ring-2 focus:ring-gray-200"
                    >
                      {wizardStep === 1 ? 'Cancel' : 'Back'}
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className={wizardStep === 3 ? 'px-8 py-2.5 text-sm font-semibold text-white rounded-lg transition-all flex items-center gap-2 shadow-sm focus:ring-2 focus:ring-offset-2 bg-green-600 hover:bg-green-700 focus:ring-green-500' : 'px-8 py-2.5 text-sm font-semibold text-white rounded-lg transition-all flex items-center gap-2 shadow-sm focus:ring-2 focus:ring-offset-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'}
                    >
                      {wizardStep === 3 && <Check className="w-4 h-4" />}
                      {wizardStep === 3 ? 'Collect Payment & Confirm' : 'Next: ' + (wizardStep === 1 ? 'Doctor' : 'Payment')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}