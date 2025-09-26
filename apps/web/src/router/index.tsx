import { Dashboard } from "@/pages/dashboard";
import { Login } from "@/pages/login";
import { Register } from "@/pages/register";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthGuard } from "./AuthGuard";

export function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Carregando...</p>}>
        <Routes>
          <Route element={<AuthGuard isPrivate={false} />}>
            <Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Route>

          <Route element={<AuthGuard isPrivate />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
