import api from './api';

export async function getProducts() {
  const response = await api.get('/products/');
  return response.data.results ?? response.data;
}

export async function getProduct(slug) {
  const response = await api.get(`/products/${slug}/`);
  return response.data;
}

export async function getCategories() {
  const response = await api.get('/categories/');
  return response.data.results ?? response.data;
}
