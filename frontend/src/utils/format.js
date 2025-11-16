// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Format date
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Format date with time
export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Get priority color
export const getPriorityColor = (priority) => {
  const colors = {
    Critical: 'bg-red-500',
    High: 'bg-orange-500',
    Medium: 'bg-yellow-500',
    Low: 'bg-green-500',
  };
  return colors[priority] || 'bg-gray-500';
};

// Get status color
export const getStatusColor = (status) => {
  const colors = {
    Pending: 'bg-yellow-500',
    Approved: 'bg-blue-500',
    Assigned: 'bg-purple-500',
    Completed: 'bg-green-500',
    Success: 'bg-green-500',
    Failed: 'bg-red-500',
    Active: 'bg-green-500',
    Busy: 'bg-orange-500',
  };
  return colors[status] || 'bg-gray-500';
};

