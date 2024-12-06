import { createWebHistory, createRouter } from 'vue-router'

// views (background)
import AppView from '../components/AppView.vue' //app background (header + WELCOME...), '/app'
import HomeView from '../components/HomeView.vue' //login page, '/'

// components (app)
import StudentCard from '../components/StudentCard.vue' // '/app/student'

import TeacherCard from '../components/TeacherCard.vue'                     // '/app/teacher'
//import TeacherStudentCard from '../components/TeacherStudentCard.vue'       // '/app/teacher/:studentid'

import AdminContainer from '../components/AdminContainer.vue'                   // '/app/admin'
import AdminAddStudentCard from '../components/AdminAddStudentCard.vue'     // '/app/admin/add-student'

const routes = [
  { name: 'home', path: '/', component: HomeView, meta: { title: 'Dissertation Management System' } },
  { name: 'app', path: '/app', component: AppView, children: [
    { name: 'student', path: 'student', component: StudentCard, meta:  { title: 'Student Home' } },
    { name: 'teacher', path: 'teacher', component: TeacherCard, meta: { title: 'Teacher Home' }},
    { path: 'admin', children: [
      { name: 'admin', path: '', component: AdminContainer, meta: { title: 'Teacher Home' } },
      { name: 'add-student', path: 'student', component: AdminAddStudentCard, meta:  { title: 'Add Student' } },
    ] },
  ], redirect : { name : 'home' }},
  {}
]

const router = createRouter({
  history: createWebHistory(),
  routes
  /*
    scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    
  }
  */
})

// change <meta> <title>
router.beforeEach( (to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;