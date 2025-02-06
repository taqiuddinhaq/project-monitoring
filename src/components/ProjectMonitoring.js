'use client';
import React, { useState } from 'react';
import { CalendarDays, Users, BarChart, AlertCircle, CheckCircle, Clock, Activity, UserCircle } from 'lucide-react';

const ProjectMonitoring = () => {
  const [projects] = useState([
    {
      id: 1,
      name: "Masterplan Kawasan A",
      manager: {
        name: "Pak Rudi",
        title: "Senior Project Manager",
        contact: "0812-3456-7890"
      },
      team: [
        { name: "Ahmad", role: "Urban Planner" },
        { name: "Budi", role: "Environmental Analyst" },
        { name: "Clara", role: "Infrastructure Specialist" }
      ],
      deadline: "2025-03-01",
      progress: 65,
      status: "On Track",
      tasks: [
        { task: "Survey Lapangan", status: "Selesai", pic: "Ahmad" },
        { task: "Analisis Data", status: "In Progress", pic: "Budi" },
        { task: "Penyusunan Konsep", status: "In Progress", pic: "Clara" }
      ]
    },
    {
      id: 2,
      name: "DED Gedung B",
      manager: {
        name: "Ibu Sarah",
        title: "Technical Manager",
        contact: "0812-9876-5432"
      },
      team: [
        { name: "Diana", role: "Architect" },
        { name: "Erik", role: "Structural Engineer" },
        { name: "Fani", role: "Quantity Surveyor" }
      ],
      deadline: "2025-04-15",
      progress: 30,
      status: "Delayed",
      tasks: [
        { task: "Gambar Arsitektur", status: "In Progress", pic: "Diana" },
        { task: "Perhitungan Struktur", status: "Not Started", pic: "Erik" },
        { task: "RAB", status: "Not Started", pic: "Fani" }
      ]
    }
  ]);

  // Helper functions
  const getStatusColor = (status) => {
    switch(status) {
      case "On Track": return "bg-gradient-to-r from-green-400 to-green-500 text-white";
      case "Delayed": return "bg-gradient-to-r from-red-400 to-red-500 text-white";
      case "Complete": return "bg-gradient-to-r from-blue-400 to-blue-500 text-white";
      default: return "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white";
    }
  };

  const getTaskStatusIcon = (status) => {
    switch(status) {
      case "Selesai": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "In Progress": return <Activity className="h-4 w-4 text-yellow-500" />;
      case "Not Started": return <Clock className="h-4 w-4 text-gray-500" />;
      default: return null;
    }
  };

  const ProgressBar = ({ progress }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className="bg-gradient-to-r from-blue-400 to-blue-500 h-2.5 rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Project Monitoring Dashboard
        </h1>
        <div className="flex gap-4">
          <span className="px-3 py-1.5 text-sm rounded-full bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-sm">
            Total Proyek: {projects.length}
          </span>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CalendarDays className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Proyek Aktif</p>
              <p className="text-2xl font-bold text-gray-800">{projects.length}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Tim</p>
              <p className="text-2xl font-bold text-gray-800">
                {projects.reduce((acc, curr) => acc + curr.team.length, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <BarChart className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Rata-rata Progress</p>
              <p className="text-2xl font-bold text-gray-800">
                {Math.round(projects.reduce((acc, curr) => acc + curr.progress, 0) / projects.length)}%
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Proyek Terlambat</p>
              <p className="text-2xl font-bold text-gray-800">
                {projects.filter(p => p.status === "Delayed").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Project List */}
      <div className="grid grid-cols-1 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">{project.name}</h2>
                <span className={`px-3 py-1.5 text-sm rounded-full ${getStatusColor(project.status)} shadow-sm`}>
                  {project.status}
                </span>
              </div>
              <ProgressBar progress={project.progress} />
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {/* Manager Information */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <UserCircle className="h-5 w-5 text-blue-500" />
                      Project Manager
                    </h3>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">{project.manager.name}</span>
                      </p>
                      <p className="text-sm text-gray-600">{project.manager.title}</p>
                      <p className="text-sm text-gray-600">
                        Contact: {project.manager.contact}
                      </p>
                    </div>
                  </div>

                  {/* Team Information */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Users className="h-5 w-5 text-gray-500" />
                      Tim Proyek
                    </h3>
                    <div className="space-y-3">
                      {project.team.map((member, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-gray-600">{member.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-gray-500" />
                      <p className="text-sm text-gray-600">
                        Deadline: {new Date(project.deadline).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart className="h-4 w-4 text-gray-500" />
                      <p className="text-sm text-gray-600">Progress: {project.progress}%</p>
                    </div>
                  </div>
                </div>
                
                {/* Task List */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Daftar Pekerjaan</h3>
                  <div className="overflow-hidden rounded-lg border">
                    <table className="min-w-full divide-y">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pekerjaan</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">PIC</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y bg-white">
                        {project.tasks.map((task, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900">{task.task}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{task.pic}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                {getTaskStatusIcon(task.status)}
                                <span className="text-sm">{task.status}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectMonitoring;