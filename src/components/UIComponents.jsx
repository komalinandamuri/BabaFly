import React from 'react';

export const Loader = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

export const SkeletonCard = () => (
  <div className="bg-gray-200 rounded-lg overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-300"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
      <div className="h-6 bg-gray-300 rounded mt-4 w-1/2"></div>
    </div>
  </div>
);

export const SkeletonProductGrid = ({ count = 8 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {Array(count)
      .fill(0)
      .map((_, i) => (
        <SkeletonCard key={i} />
      ))}
  </div>
);

export const EmptyState = ({ icon: Icon, title, message }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    {Icon && <Icon size={48} className="text-gray-400 mb-4" />}
    <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
    <p className="text-gray-500">{message}</p>
  </div>
);
