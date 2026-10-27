const initialUsers = [
  { id: 1, username: 'Admin', password: 'Admin', role: 1, status: 1 },
  { id: 2, username: 'staff1', password: '123', role: 2, status: 1 }
];

const initialCategories = [
  { id: 1, name: 'Technology', status: 1 },
  { id: 2, name: 'Sports', status: 1 },
  { id: 3, name: 'Health', status: 0 }
];

const initialNews = [
  { id: 1, title: 'React 19 Release', content: 'React 19 is coming...', categoryId: 1, createdBy: 1, status: 1, tags: 'react, js' },
  { id: 2, title: 'New Football Season', content: 'The new season has started...', categoryId: 2, createdBy: 2, status: 1, tags: 'football, sports' }
];

export const initData = () => {
  const storedUsers = localStorage.getItem('users');
  if (!storedUsers) {
    localStorage.setItem('users', JSON.stringify(initialUsers));
  } else {
    // Migrate the old seeded demo account without replacing user-created accounts.
    const users = JSON.parse(storedUsers);
    const oldSeedAdmin = users.find(
      user => user.username === 'admin' && user.password === '123' && user.role === 1
    );
    if (oldSeedAdmin) {
      const migratedUsers = users.map(user => user.id === oldSeedAdmin.id
        ? { ...user, username: 'Admin', password: 'Admin' }
        : user
      );
      localStorage.setItem('users', JSON.stringify(migratedUsers));

      const session = JSON.parse(localStorage.getItem('currentUser') || 'null');
      if (session?.id === oldSeedAdmin.id && session?.username === 'admin') {
        localStorage.removeItem('currentUser');
      }
    }
  }
  if (!localStorage.getItem('categories')) {
    localStorage.setItem('categories', JSON.stringify(initialCategories));
  }
  if (!localStorage.getItem('news')) {
    localStorage.setItem('news', JSON.stringify(initialNews));
  }
};

// Generic CRUD operations
const getItems = (key) => JSON.parse(localStorage.getItem(key)) || [];
const saveItems = (key, items) => localStorage.setItem(key, JSON.stringify(items));

export const getCategories = () => getItems('categories');
export const saveCategories = (cats) => saveItems('categories', cats);

export const getNews = () => getItems('news');
export const saveNews = (news) => saveItems('news', news);

export const getUsers = () => getItems('users');
export const saveUsers = (users) => saveItems('users', users);

// Auth
export const login = (username, password) => {
  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    if (user.role === 1) { // 1 = Admin, 2 = Staff (only admin can access admin panel for now)
       const authenticatedUser = {
         id: user.id,
         username: user.username,
         role: user.role,
         status: user.status
       };
       localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
       return { success: true, user: authenticatedUser };
    } else {
       return { success: false, message: 'Only Admin can login to this system.' };
    }
  }
  return { success: false, message: 'Invalid username or password.' };
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};
