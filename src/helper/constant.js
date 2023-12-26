const UserRole = {
  ADMIN: 'Admin',
  MASTER: 'Master',
  STICHING: 'Stiching',
  CHECKING: 'Checking',
  PRESS: 'Press',
  DELIVERY: 'Delivery',
  STICHING_WORKER: 'Stiching Worker',
  NO_ROLE: 'No Role',
};

const UserStatus = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
};

const ProcessStatus = {
  PENDING: 'Pending',
  CUTTING_OKAY: 'Cutting Okay',
  STICHING: 'Stiching',
  WORKER_ISSUE: 'Worker Issue',
  CHECKING_WORKER_RECEIVED: 'Checking Worker Received',
  CHECKING_WORKER_ISSUE: 'Checking Worker Issue',
  PRESS_ISSUE: 'Press Issue',
  DELIVERY_ISSUE: 'Delivery Issue',
  DELIVER: 'Deliver',
};

module.exports = { UserRole, UserStatus, ProcessStatus };
