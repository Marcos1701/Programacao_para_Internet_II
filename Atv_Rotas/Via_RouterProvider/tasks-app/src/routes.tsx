import { Navigate, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { TasksPage } from "./pages/TasksPage";
import { TaskForm } from "./pages/TasksPage/components/TaskForm";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { TaskPage } from "./pages/TaskPage";
import { AboutPage } from "./pages/AboutPage";


export const AppRoutes = () => {

    const element = createBrowserRouter([
        {
            path: '/',
            element: <HomePage />,
            errorElement: <NotFoundPage />
        },
        {
            path: 'login',
            element: <LoginPage />,
            errorElement: <NotFoundPage />
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
            ],
            errorElement: <NotFoundPage />
        },
        {
            path: 'sobre',
            element: <AboutPage />,
            errorElement: <NotFoundPage />
        },
        {
            path: '*',
            element: <NotFoundPage />,
            errorElement: <NotFoundPage />
        }
    ])
    return element;
}