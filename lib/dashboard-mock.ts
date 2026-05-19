/** Usuario de la demo (presentación a New Business Development). */
export const DASHBOARD_USER = {
  name: 'Miguel A.',
  department: 'New Business Development',
  role: 'Admin',
  initials: 'MA',
} as const;

export type ChartPoint = {
  hour: string;
  oxygen: number;
  power: number;
};

export type EquipmentUnit = {
  id: string;
  name: string;
  zone: string;
  flow: string;
  doLevel: string;
  uptime: string;
};

export const TELEMETRY_SERIES: ChartPoint[] = [
  { hour: '00:00', oxygen: 6.2, power: 92 },
  { hour: '02:00', oxygen: 6.5, power: 90 },
  { hour: '04:00', oxygen: 6.8, power: 88 },
  { hour: '06:00', oxygen: 7.1, power: 85 },
  { hour: '08:00', oxygen: 7.4, power: 82 },
  { hour: '10:00', oxygen: 7.8, power: 78 },
  { hour: '12:00', oxygen: 8.1, power: 74 },
  { hour: '14:00', oxygen: 8.3, power: 71 },
  { hour: '16:00', oxygen: 8.4, power: 68 },
  { hour: '18:00', oxygen: 8.5, power: 65 },
  { hour: '20:00', oxygen: 8.4, power: 63 },
  { hour: '22:00', oxygen: 8.3, power: 62 },
  { hour: '24:00', oxygen: 8.2, power: 61 },
];

export const ACTIVE_GENERATORS: EquipmentUnit[] = [
  {
    id: 'gen-1',
    name: 'Nexus 500',
    zone: 'Zona A · Línea primaria',
    flow: '4.200 m³/h',
    doLevel: '8.6 mg/L',
    uptime: '99.2%',
  },
  {
    id: 'gen-2',
    name: 'Titan 150',
    zone: 'Zona B · Equalización',
    flow: '1.850 m³/h',
    doLevel: '8.3 mg/L',
    uptime: '98.7%',
  },
  {
    id: 'gen-3',
    name: 'Nexus 300',
    zone: 'Zona C · Recirculación',
    flow: '2.950 m³/h',
    doLevel: '8.5 mg/L',
    uptime: '99.5%',
  },
  {
    id: 'gen-4',
    name: 'Freya 80',
    zone: 'Zona D · Acopio',
    flow: '980 m³/h',
    doLevel: '8.1 mg/L',
    uptime: '97.9%',
  },
];

export const KPI_SNAPSHOT = {
  dissolvedOxygen: { value: '8.5', unit: 'mg/L', delta: '+12% vs ayer' },
  energySavings: { value: '42', unit: '%', delta: 'Acumulado 30 días' },
  flowProcessed: { value: '14,000', unit: 'm³', delta: 'Últimas 24 h' },
  systemStatus: { value: 'Óptimo', unit: '', delta: '0 alertas críticas' },
} as const;

export type DeviceStatus = 'online' | 'maintenance' | 'offline';

export type FleetDevice = EquipmentUnit & {
  serial: string;
  firmware: string;
  status: DeviceStatus;
  powerDraw: string;
  lastService: string;
};

export const FLEET_DEVICES: FleetDevice[] = [
  ...ACTIVE_GENERATORS.map((g, i) => ({
    ...g,
    serial: `MX-${2400 + i}-PTS`,
    firmware: 'v3.2.1',
    status: 'online' as const,
    powerDraw: ['12.4 kW', '5.1 kW', '8.8 kW', '3.2 kW'][i],
    lastService: ['12 Mar 2026', '28 Feb 2026', '05 Mar 2026', '19 Ene 2026'][i],
  })),
  {
    id: 'gen-5',
    name: 'Nexus 200',
    zone: 'Zona E · Reserva',
    flow: '—',
    doLevel: '—',
    uptime: '—',
    serial: 'MX-2405-PTS',
    firmware: 'v3.1.8',
    status: 'maintenance',
    powerDraw: '0 kW',
    lastService: 'En curso',
  },
  {
    id: 'gen-6',
    name: 'Titan 90',
    zone: 'Zona F · Piloto',
    flow: '—',
    doLevel: '—',
    uptime: '—',
    serial: 'MX-2398-PTS',
    firmware: 'v3.2.0',
    status: 'offline',
    powerDraw: '—',
    lastService: '02 Mar 2026',
  },
];

export const ANALYTICS_SUMMARY = [
  { label: 'DO medio (7 d)', value: '8.2 mg/L', trend: '+0.4' },
  { label: 'kWh ahorrados', value: '18.4 MWh', trend: '-42%' },
  { label: 'Horas en rango óptimo', value: '96.8%', trend: '+2.1%' },
  { label: 'Eventos de calidad', value: '3', trend: '-67%' },
] as const;

export const ZONE_PERFORMANCE = [
  { zone: 'Zona A', doAvg: 8.6, savings: 44 },
  { zone: 'Zona B', doAvg: 8.3, savings: 41 },
  { zone: 'Zona C', doAvg: 8.5, savings: 43 },
  { zone: 'Zona D', doAvg: 8.1, savings: 39 },
] as const;

export type AlertSeverity = 'critical' | 'warning' | 'info';

export type DashboardAlert = {
  id: string;
  severity: AlertSeverity;
  title: string;
  detail: string;
  device: string;
  time: string;
  acknowledged: boolean;
};

export const DASHBOARD_ALERTS: DashboardAlert[] = [
  {
    id: 'a1',
    severity: 'warning',
    title: 'Presión de inyección elevada',
    detail: 'Titan 150 superó 4.2 bar durante 8 min. Revisar válvula de retorno.',
    device: 'Titan 150 · Zona B',
    time: 'Hace 18 min',
    acknowledged: false,
  },
  {
    id: 'a2',
    severity: 'info',
    title: 'Actualización de firmware disponible',
    detail: 'v3.2.2 lista para despliegue en ventana de mantenimiento.',
    device: 'Flota · Global',
    time: 'Hace 2 h',
    acknowledged: false,
  },
  {
    id: 'a3',
    severity: 'info',
    title: 'Pico de oxígeno registrado',
    detail: 'Nexus 500 alcanzó 8.9 mg/L — dentro de parámetros de diseño.',
    device: 'Nexus 500 · Zona A',
    time: 'Hace 4 h',
    acknowledged: true,
  },
  {
    id: 'a4',
    severity: 'warning',
    title: 'Mantenimiento programado',
    detail: 'Nexus 200 en modo servicio hasta las 18:00.',
    device: 'Nexus 200 · Zona E',
    time: 'Hace 6 h',
    acknowledged: true,
  },
  {
    id: 'a5',
    severity: 'critical',
    title: 'Pérdida de señal IoT',
    detail: 'Titan 90 sin telemetría desde 02:14. Comprobar gateway local.',
    device: 'Titan 90 · Zona F',
    time: 'Hace 9 h',
    acknowledged: false,
  },
];
