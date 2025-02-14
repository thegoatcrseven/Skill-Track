import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import toast, { Toaster } from 'react-hot-toast';

export default function Agenda() {
  const [events, setEvents] = useState([]);
  const [goals, setGoals] = useState([]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    type: 'EVENT'
  });

  // Fetch goals and convert them to calendar events
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch('/api/goals');
        const data = await response.json();
        setGoals(data);
        
        // Convert goals to calendar events
        const goalEvents = data.map(goal => ({
          title: `🎯 ${goal.title}`,
          date: goal.dueDate,
          backgroundColor: '#10B981',
          borderColor: '#059669',
          classNames: ['goal-event'],
          extendedProps: {
            description: goal.description,
            type: 'GOAL'
          }
        }));
        
        setEvents(prevEvents => [...prevEvents, ...goalEvents]);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchGoals();
  }, []);

  // Check for notifications every minute
  useEffect(() => {
    const checkNotifications = () => {
      const now = new Date();
      events.forEach(event => {
        if (event.extendedProps?.type === 'EVENT') {
          const eventDateTime = new Date(event.date + 'T' + event.extendedProps.time);
          if (Math.abs(now - eventDateTime) < 60000) { // Within 1 minute
            toast(`🔔 ${event.title}`, {
              duration: 5000,
              position: 'top-right',
              style: {
                background: '#1F2937',
                color: '#fff',
                border: '1px solid #10B981'
              }
            });
          }
        }
      });
    };

    const interval = setInterval(checkNotifications, 60000);
    return () => clearInterval(interval);
  }, [events]);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setNewEvent(prev => ({ ...prev, date: info.dateStr }));
    setShowAddEvent(true);
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    
    const eventToAdd = {
      title: newEvent.title,
      date: newEvent.date,
      backgroundColor: '#3B82F6',
      borderColor: '#2563EB',
      classNames: ['custom-event'],
      extendedProps: {
        description: newEvent.description,
        time: newEvent.time,
        type: 'EVENT'
      }
    };

    setEvents(prev => [...prev, eventToAdd]);
    
    // TODO: Save to backend
    // const response = await fetch('/api/events', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newEvent)
    // });

    setShowAddEvent(false);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      type: 'EVENT'
    });

    toast.success('Event added successfully!', {
      style: {
        background: '#1F2937',
        color: '#fff',
        border: '1px solid #10B981'
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">My Calendar</h2>
          </div>
          
          <div className="calendar-container">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              dateClick={handleDateClick}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth'
              }}
              height="auto"
              className="rounded-lg shadow bg-white p-4"
            />
          </div>
        </div>

        {showAddEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Add New Event
                </h3>
                <button
                  onClick={() => setShowAddEvent(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleAddEvent} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="EVENT">Event</option>
                    <option value="TASK">Task</option>
                    <option value="REMINDER">Reminder</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddEvent(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
}
