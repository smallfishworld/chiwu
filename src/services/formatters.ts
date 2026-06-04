/**
 * Format a number as CNY currency string.
 * e.g. 9999 → "¥9,999.00"
 */
export function formatCurrency(value: number, decimals = 2): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  const formatted = abs.toLocaleString('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${sign}¥${formatted}`;
}

/**
 * Format a currency value compactly for charts.
 * e.g. 33932 → "¥34k"
 */
export function formatCurrencyCompact(value: number): string {
  if (value >= 10000) {
    return `¥${(value / 10000).toFixed(0)}万`;
  }
  if (value >= 1000) {
    return `¥${(value / 1000).toFixed(1)}k`;
  }
  return `¥${value.toFixed(0)}`;
}

/**
 * Format an ISO date string for display.
 * e.g. "2026-05-31" → "2026年5月31日"
 */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

/**
 * Format an ISO date as YYYY-MM-DD for form inputs.
 */
export function formatDateInput(iso: string): string {
  return iso.substring(0, 10);
}

/**
 * Format a duration in days to human-readable.
 * e.g. 3 → "3天", 412 → "1年1个月", 1538 → "4年2个月"
 */
export function formatDuration(days: number): string {
  if (days < 1) return '不到1天';
  if (days === 1) return '1天';

  const years = Math.floor(days / 365);
  const remainingDays = days % 365;
  const months = Math.floor(remainingDays / 30);

  if (years > 0 && months > 0) {
    return `${years}年${months}个月`;
  }
  if (years > 0) {
    return `${years}年`;
  }
  if (months > 0) {
    return `${months}个月`;
  }
  return `${days}天`;
}

/**
 * Format a decimal to a percentage string.
 * e.g. 83.9 → "83.9%"
 */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format P&L with +/- sign.
 */
export function formatPnL(value: number): string {
  if (value === 0) return '+¥0';
  const sign = value > 0 ? '+' : '';
  return `${sign}¥${Math.abs(value).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Format a number with optional unit.
 */
export function formatWithUnit(value: number, unit: string, decimals = 2): string {
  return `${value.toLocaleString('zh-CN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${unit}`;
}
