// utility function to get status color based on status
export const getStatusColor = (status: string): string => {
  if (status === "Complete") return "text-green-600";
  if (status === "Pending") return "text-orange-600";
  return "text-gray-600";
};

// utility function to generate page numbers for pagination
export const getPageNumbers = (currentPage: number, totalPages: number): (number | string)[] => {
  const pages: (number | string)[] = [];
  
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }
  
  return pages;
};

// static stats data
export const statsData = [
  {
    title: "Unique Visitors",
    value: "24.7K",
    change: "+20%",
    trend: "positive",
  },
  {
    title: "Total Pageviews",
    value: "55.9K",
    change: "+4%",
    trend: "positive",
  },
  {
    title: "Bounce Rate",
    value: "54%",
    change: "-1.59%",
    trend: "negative",
  },
  {
    title: "Visit Duration",
    value: "2m 56s",
    change: "+7%",
    trend: "positive",
  },
];