import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { categoriesAPI } from '../services/apiEndpoints';
import { Loader, EmptyState } from '../components/UIComponents';
import { ShoppingBag } from 'lucide-react';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-12">All Categories</h1>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/categories/${category._id}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer h-full">
                <div className="relative h-48 bg-gradient-to-br from-primary to-yellow-400 flex items-center justify-center">
                  <div className="text-6xl group-hover:scale-110 transition">
                    {category.icon || '💎'}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="text-primary font-semibold group-hover:text-secondary transition">
                    Explore →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={ShoppingBag}
          title="No Categories Found"
          message="Check back soon"
        />
      )}
    </div>
  );
};

export default CategoriesPage;
