import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useAuth } from "../context/AuthContext";
import { Alert, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function VerifyPass() {
  const { verifyPassword } = useAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const search = window.location.search;
  const { oobCode, mode } = queryString.parse(search);
  const history = useHistory();
  console.log(oobCode);

  useEffect(() => {
    if (mode === "resetPassword") setError("");
    setLoading(true);

    const promises = [];
    if (oobCode) {
      promises.push(verifyPassword(oobCode));
    }
    Promise.all(promises)
      .then(() => {
        history.push({
          pathname: "/reset-password",
          state: { code: oobCode },
        });
      })
      .catch(() => {
        setError("Failed to get account");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
    </div>
  );
}
