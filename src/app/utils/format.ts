export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatTime = (isoString: string): string => {
  const date = new Date(isoString);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const formatRelativeTime = (isoString: string): string => {
  if (!isoString || typeof isoString !== "string") {
    return "Không xác định";
  }

  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    return "Không xác định";
  }

  const now = new Date();
  const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);

  if (!Number.isFinite(diffInSeconds)) {
    return "Không xác định";
  }

  const rtf = new Intl.RelativeTimeFormat("vi", { numeric: "auto" });

  const timeUnits: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
    { unit: "year", seconds: 31557600 },
    { unit: "month", seconds: 2629800 },
    { unit: "week", seconds: 604800 },
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
    { unit: "second", seconds: 1 },
  ];

  for (const { unit, seconds } of timeUnits) {
    const difference = Math.round(diffInSeconds / seconds);
    if (Math.abs(difference) >= 1) {
      return rtf.format(difference, unit);
    }
  }

  return "Mới đây";
};
