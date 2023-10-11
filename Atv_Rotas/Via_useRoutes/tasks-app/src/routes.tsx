import { Navigate, useRoutes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { TasksPage } from "./pages/TasksPage";
import { TaskForm } from "./pages/TasksPage/components/TaskForm";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { TaskPage } from "./pages/TaskPage";
import { AboutPage } from "./pages/AboutPage";


export const AppRoutes = () => {

    const element = useRoutes([
        {
            path: '/',
            element: <HomePage />
        },
        {
            path: 'login',
            element: <LoginPage />
        },
        {
            path: 'tasks',
            children: [
                {
                    path: '',
                    index: true,
                    element: <ProtectedRoute>
                        <TasksPage />
                    </ProtectedRoute>
                },
                {
                    path: 'add-task',
                    element: <ProtectedRoute>
                        <TaskForm />
                    </ProtectedRoute>
                },
                {
                    path: 'detail-task/:id',
                    element: <ProtectedRoute>
                        <TaskPage />
                    </ProtectedRoute>
                }, {
                    path: '*',
                    element: <Navigate to="/tasks" />
                }
            ]
        },
        {
            path: 'sobre',
            element: <AboutPage />
        },
        {
            path: '*',
            element: <NotFoundPage />
        }
    ])
    return element;
}