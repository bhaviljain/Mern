import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../../src/Spinner"
import { Outlet } from "react-router-dom";
import { useAuth } from "../Context/auth";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
  const authCheck = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`)
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path=""/>;
}