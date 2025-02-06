'use client';
import React, { useState, useEffect } from 'react';
import { CalendarDays, Users, BarChart, AlertCircle, CheckCircle, Clock, Activity, UserCircle, Plus, Edit2, Trash2, X } from 'lucide-react';

const ProjectMonitoring = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    manager: {
      name: '',
      title: '',
      contact: ''
    },
    team: [{ name: '', role: '' }],
    deadline: '',
    progress: 0,
    status: 'On Track',
    tasks: [{ task: '', status: 'Not Started', pic: '' }]
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      // Initial demo data
      const initialProjects = [
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
        }
      ];
      setProjects(initialProjects);
      localStorage.setItem('projects', JSON.stringify(initialProjects));
    }
  }, []);

  // Save to localStorage whenever projects change
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);
  const openModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData(project);
    } else {
      setEditingProject(null);
      setFormData({
        name: '',
        manager: { name: '', title: '', contact: '' },
        team: [{ name: '', role: '' }],
        deadline: '',
        progress: 0,
        status: 'On Track',
        tasks: [{ task: '', status: 'Not Started', pic: '' }]
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setFormData({
      name: '',
      manager: { name: '', title: '', contact: '' },
      team: [{ name: '', role: '' }],
      deadline: '',
      progress: 0,
      status: 'On Track',
      tasks: [{ task: '', status: 'Not Started', pic: '' }]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProject) {
      setProjects(projects.map(p => 
        p.id === editingProject.id ? { ...formData, id: p.id } : p
      ));
    } else {
      setProjects([...projects, { ...formData, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDelete = (projectId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus proyek ini?')) {
      setProjects(projects.filter(p => p.id !== projectId));
    }
  };

  const addTeamMember = () => {
    setFormData({
      ...formData,
      team: [...formData.team, { name: '', role: '' }]
    });
  };

  const removeTeamMember = (index) => {
    setFormData({
      ...formData,
      team: formData.team.filter((_, i) => i !== index)
    });
  };

  const addTask = () => {
    setFormData({
      ...formData,
      tasks: [...formData.tasks, { task: '', status: 'Not Started', pic: '' }]
    });
  };

  const removeTask = (index) => {
    setFormData({
      ...formData,
      tasks: formData.tasks.filter((_, i) => i !== index)
    });
  };
  // Helper functions untuk UI
  const getStatusColor = (status) => {
    switch(status) {
      case "On Track": return "bg-gradient-to-r from-green-400/90 to-green-500/90 text-white";
      case "Delayed": return "bg-gradient-to-r from-red-400/90 to-red-500/90 text-white";
      case "Complete": return "bg-gradient-to-r from-blue-400/90 to-blue-500/90 text-white";
      default: return "bg-gradient-to-r from-yellow-400/90 to-yellow-500/90 text-white";
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

  // Modal Form Component
  const ProjectForm = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {editingProject ? 'Edit Proyek' : 'Tambah Proyek Baru'}
          </h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Proyek</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            {/* Manager Information */}
            <div className="space-y-4">
              <h3 className="font-medium">Project Manager</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm text-gray-700">Nama</label>
                  <input
                    type="text"
                    required
                    value={formData.manager.name}
                    onChange={e => setFormData({
                      ...formData,
                      manager: {...formData.manager, name: e.target.value}
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Jabatan</label>
                  <input
                    type="text"
                    required
                    value={formData.manager.title}
                    onChange={e => setFormData({
                      ...formData,
                      manager: {...formData.manager, title: e.target.value}
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Kontak</label>
                  <input
                    type="text"
                    required
                    value={formData.manager.contact}
                    onChange={e => setFormData({
                      ...formData,
                      manager: {...formData.manager, contact: e.target.value}
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>
            </div>

            {/* Team Members */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Tim Proyek</h3>
                <button
                  type="button"
                  onClick={addTeamMember}
                  className="text-sm text-blue-500 hover:text-blue-600"
                >
                  + Tambah Anggota Tim
                </button>
              </div>
              {formData.team.map((member, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      placeholder="Nama"
                      required
                      value={member.name}
                      onChange={e => {
                        const newTeam = [...formData.team];
                        newTeam[index].name = e.target.value;
                        setFormData({...formData, team: newTeam});
                      }}
                      className="block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                    <input
                      type="text"
                      placeholder="Jabatan"
                      required
                      value={member.role}
                      onChange={e => {
                        const newTeam = [...formData.team];
                        newTeam[index].role = e.target.value;
                        setFormData({...formData, team: newTeam});
                      }}
                      className="block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>
                  {formData.team.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTeamMember(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {/* Project Status and Progress */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="On Track">On Track</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Complete">Complete</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Progress (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={formData.progress}
                  onChange={e => setFormData({...formData, progress: Number(e.target.value)})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Deadline</label>
                <input
                  type="date"
                  required
                  value={formData.deadline}
                  onChange={e => setFormData({...formData, deadline: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>

            {/* Tasks */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Daftar Pekerjaan</h3>
                <button
                  type="button"
                  onClick={addTask}
                  className="text-sm text-blue-500 hover:text-blue-600"
                >
                  + Tambah Pekerjaan
                </button>
              </div>
              {formData.tasks.map((task, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Nama Pekerjaan"
                      required
                      value={task.task}
                      onChange={e => {
                        const newTasks = [...formData.tasks];
                        newTasks[index].task = e.target.value;
                        setFormData({...formData, tasks: newTasks});
                      }}
                      className="block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                    <input
                      type="text"
                      placeholder="PIC"
                      required
                      value={task.pic}
                      onChange={e => {
                        const newTasks = [...formData.tasks];
                        newTasks[index].pic = e.target.value;
                        setFormData({...formData, tasks: newTasks});
                      }}
                      className="block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                    <select
                      value={task.status}
                      onChange={e => {
                        const newTasks = [...formData.tasks];
                        newTasks[index].status = e.target.value;
                        setFormData({...formData, tasks: newTasks});
                      }}
                      className="block w-full rounded-md border border-gray-300 px-3 py-2"
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Selesai">Selesai</option>
                    </select>
                  </div>
                  {formData.tasks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTask(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {editingProject ? 'Simpan Perubahan' : 'Tambah Proyek'}
            </button>
          </div>
        </form>
      </div>
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
          <button
            onClick={() => openModal()}
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Tambah Proyek
          </button>
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
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openModal(project)}
                    className="p-2 text-blue-500 hover:text-blue-600"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <span className={`px-3 py-1.5 text-sm rounded-full ${getStatusColor(project.status)} shadow-sm`}>
                    {project.status}
                  </span>
                </div>
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

      {/* Modal */}
      {isModalOpen && <ProjectForm />}
    </div>
  );
};

export default ProjectMonitoring;