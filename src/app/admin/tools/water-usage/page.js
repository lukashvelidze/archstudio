'use client';

import '../../admin.css';
import { useState } from 'react';
import Link from 'next/link';

export default function WaterUsagePage() {
  const [calc, setCalc] = useState({ binebi: '', komerciuli: '', a: '' });

  const parsed = {
    binebi: parseInt(calc.binebi) || 0,
    komerciuli: parseInt(calc.komerciuli) || 0,
    a: parseFloat(calc.a) || 0,
  };

  const ready = parsed.binebi > 0 && parsed.a > 0;

  const norms = {
    sacxovrebeli: 300,
    komerciuli: 16,
    Qhru: 15.6,
    QhruC: 4,
    Qo_res: 0.3,
    Qo_com: 0.14,
    V: 2,
    v_kan: 1.5,
  };

  const mowkobilobebi = parsed.binebi * 5;
  const momsaxurebis_max = parsed.binebi * 4;
  const komerciuliDevices = parsed.komerciuli * 4;

  const Qres = mowkobilobebi * norms.sacxovrebeli;
  const Qcom = komerciuliDevices * norms.komerciuli;
  const totalL = Qres + Qcom;

  const Pres = (norms.Qhru * momsaxurebis_max) / (3600 * mowkobilobebi * norms.Qo_res);
  const Pcom = (norms.QhruC * komerciuliDevices) / (3600 * 30 * norms.Qo_com);
  const NPjami = Pres * mowkobilobebi + Pcom * komerciuliDevices;

  const qo = ((NPjami * norms.Qo_res + Pcom * komerciuliDevices * norms.Qo_com) / (NPjami + Pcom * komerciuliDevices)).toFixed(3);
  const qmax = (parsed.a * qo * 5) / 1000;

  const milsadeniDiameter = (1.13 * Math.sqrt(qmax / norms.V)).toFixed(4);
  const kanalDiameter = (1.13 * Math.sqrt(qmax / norms.v_kan) / Math.pow(0.3, 0.4)).toFixed(3);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/login';
  };

  return (
    <div className="dashboard-main water-usage-page">
      <nav className="admin-top-nav">
        <div className="admin-nav-container">
          <div className="nav-center">
            <Link href="/admin" className="nav-link">Dashboard</Link>
          </div>
          <div className="nav-right">
            <button onClick={handleLogout} className="logoutButton">Log Out</button>
          </div>
        </div>
      </nav>

      <h1 className="admin-title">წყლის ხარჯის კალკულატორი</h1>

      <div className="admin-form water-usage-form">
        <input
          className="inputStyle"
          type="number"
          placeholder="ბინების რაოდენობა"
          value={calc.binebi}
          onChange={(e) => setCalc({ ...calc, binebi: e.target.value })}
        />
        <input
          className="inputStyle"
          type="number"
          placeholder="კომერციული ხელსაწყოები (N)"
          value={calc.komerciuli}
          onChange={(e) => setCalc({ ...calc, komerciuli: e.target.value })}
        />
        <input
          className="inputStyle"
          type="number"
          step="0.01"
          placeholder="მაჩვენებელი a (СНиП 2.04.01)"
          value={calc.a}
          onChange={(e) => setCalc({ ...calc, a: e.target.value })}
        />
      </div>

      {ready && (
        <div className="admin-form water-usage-results">
          <p><strong>საცხოვრებელი ხარჯი:</strong> {Qres} ლ/დღე</p>
          <p><strong>კომერციული ხარჯი:</strong> {Qcom} ლ/დღე</p>
          <p><strong>სულ ხარჯი:</strong> {totalL} ლ/დღე ({(totalL / 1000).toFixed(2)} მ³)</p>
          <p><strong>ცივი წყლის წამური ხარჯი (qₒ):</strong> {qo} ლ/წმ</p>
          <p><strong>მილის დიამეტრი:</strong> {milsadeniDiameter} მ</p>
          <p><strong>კანალიზაციის მილის დიამეტრი:</strong> {kanalDiameter} მმ</p>
        </div>
      )}
    </div>
  );
}
