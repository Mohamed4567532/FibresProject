import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FibreProduct } from '../models/fibre-product';
import { Service } from '../models/service';
import { BlogPost } from '../models/service';
import { TeamMember } from '../models/service';
import { Testimonial } from '../models/service';
import { ContactForm } from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl = environment.apiUrl || 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    });
  }

  // ==================== SERVICES API ====================
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/services`, { headers: this.getHeaders() });
  }

  getServiceById(id: number): Observable<Service> {
    return this.http.get<Service>(`${this.apiUrl}/services/${id}`, { headers: this.getHeaders() });
  }

  createService(service: Service): Observable<Service> {
    return this.http.post<Service>(`${this.apiUrl}/services`, service, { headers: this.getHeaders() });
  }

  updateService(id: number, service: Service): Observable<Service> {
    return this.http.put<Service>(`${this.apiUrl}/services/${id}`, service, { headers: this.getHeaders() });
  }

  deleteService(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/services/${id}`, { headers: this.getHeaders() });
  }

  // ==================== PRODUITS API ====================
  getProducts(): Observable<FibreProduct[]> {
    return this.http.get<FibreProduct[]>(`${this.apiUrl}/products`, { headers: this.getHeaders() });
  }

  getProductById(id: number): Observable<FibreProduct> {
    return this.http.get<FibreProduct>(`${this.apiUrl}/products/${id}`, { headers: this.getHeaders() });
  }

  createProduct(product: FibreProduct): Observable<FibreProduct> {
    return this.http.post<FibreProduct>(`${this.apiUrl}/products`, product, { headers: this.getHeaders() });
  }

  updateProduct(id: number, product: FibreProduct): Observable<FibreProduct> {
    return this.http.put<FibreProduct>(`${this.apiUrl}/products/${id}`, product, { headers: this.getHeaders() });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${id}`, { headers: this.getHeaders() });
  }

  searchProducts(query: string): Observable<FibreProduct[]> {
    return this.http.get<FibreProduct[]>(`${this.apiUrl}/products/search?q=${encodeURIComponent(query)}`, { headers: this.getHeaders() });
  }

  getProductsByCategory(category: string): Observable<FibreProduct[]> {
    return this.http.get<FibreProduct[]>(`${this.apiUrl}/products/category/${encodeURIComponent(category)}`, { headers: this.getHeaders() });
  }

  // ==================== BLOG API ====================
  getBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}/blog`, { headers: this.getHeaders() });
  }

  getBlogPostById(id: number): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/blog/${id}`, { headers: this.getHeaders() });
  }

  createBlogPost(post: BlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${this.apiUrl}/blog`, post, { headers: this.getHeaders() });
  }

  updateBlogPost(id: number, post: BlogPost): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${this.apiUrl}/blog/${id}`, post, { headers: this.getHeaders() });
  }

  deleteBlogPost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/blog/${id}`, { headers: this.getHeaders() });
  }

  // ==================== ÉQUIPE API ====================
  getTeamMembers(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(`${this.apiUrl}/team`, { headers: this.getHeaders() });
  }

  getTeamMemberById(id: number): Observable<TeamMember> {
    return this.http.get<TeamMember>(`${this.apiUrl}/team/${id}`, { headers: this.getHeaders() });
  }

  createTeamMember(member: TeamMember): Observable<TeamMember> {
    return this.http.post<TeamMember>(`${this.apiUrl}/team`, member, { headers: this.getHeaders() });
  }

  updateTeamMember(id: number, member: TeamMember): Observable<TeamMember> {
    return this.http.put<TeamMember>(`${this.apiUrl}/team/${id}`, member, { headers: this.getHeaders() });
  }

  deleteTeamMember(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/team/${id}`, { headers: this.getHeaders() });
  }

  // ==================== TÉMOIGNAGES API ====================
  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(`${this.apiUrl}/testimonials`, { headers: this.getHeaders() });
  }

  getTestimonialById(id: number): Observable<Testimonial> {
    return this.http.get<Testimonial>(`${this.apiUrl}/testimonials/${id}`, { headers: this.getHeaders() });
  }

  createTestimonial(testimonial: Testimonial): Observable<Testimonial> {
    return this.http.post<Testimonial>(`${this.apiUrl}/testimonials`, testimonial, { headers: this.getHeaders() });
  }

  updateTestimonial(id: number, testimonial: Testimonial): Observable<Testimonial> {
    return this.http.put<Testimonial>(`${this.apiUrl}/testimonials/${id}`, testimonial, { headers: this.getHeaders() });
  }

  deleteTestimonial(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/testimonials/${id}`, { headers: this.getHeaders() });
  }

  // ==================== CONTACT API ====================
  sendContactForm(formData: ContactForm): Observable<any> {
    return this.http.post(`${this.apiUrl}/contact`, formData, { headers: this.getHeaders() });
  }

  getContactMessages(): Observable<ContactForm[]> {
    return this.http.get<ContactForm[]>(`${this.apiUrl}/contact`, { headers: this.getHeaders() });
  }

  getContactMessageById(id: number): Observable<ContactForm> {
    return this.http.get<ContactForm>(`${this.apiUrl}/contact/${id}`, { headers: this.getHeaders() });
  }

  updateContactMessage(id: number, message: ContactForm): Observable<ContactForm> {
    return this.http.put<ContactForm>(`${this.apiUrl}/contact/${id}`, message, { headers: this.getHeaders() });
  }

  deleteContactMessage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/contact/${id}`, { headers: this.getHeaders() });
  }

  // ==================== DEVIS API ====================
  requestQuote(quoteData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/quotes`, quoteData, { headers: this.getHeaders() });
  }

  getQuotes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/quotes`, { headers: this.getHeaders() });
  }

  getQuoteById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/quotes/${id}`, { headers: this.getHeaders() });
  }

  updateQuote(id: number, quote: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/quotes/${id}`, quote, { headers: this.getHeaders() });
  }

  deleteQuote(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/quotes/${id}`, { headers: this.getHeaders() });
  }

  // ==================== NEWSLETTER API ====================
  subscribeNewsletter(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/newsletter`, { email }, { headers: this.getHeaders() });
  }

  getNewsletterSubscribers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/newsletter`, { headers: this.getHeaders() });
  }

  unsubscribeNewsletter(email: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/newsletter/${encodeURIComponent(email)}`, { headers: this.getHeaders() });
  }

  // ==================== COMMANDES API ====================
  createOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders`, orderData, { headers: this.getHeaders() });
  }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/orders`, { headers: this.getHeaders() });
  }

  getOrderById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/orders/${id}`, { headers: this.getHeaders() });
  }

  updateOrderStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/orders/${id}/status`, { status }, { headers: this.getHeaders() });
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/orders/${id}`, { headers: this.getHeaders() });
  }

  // ==================== PANIER API ====================
  getCart(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cart/${userId}`, { headers: this.getHeaders() });
  }

  addToCart(userId: string, productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart`, { userId, productId, quantity }, { headers: this.getHeaders() });
  }

  updateCartItem(userId: string, productId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/cart/${userId}/${productId}`, { quantity }, { headers: this.getHeaders() });
  }

  removeFromCart(userId: string, productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart/${userId}/${productId}`, { headers: this.getHeaders() });
  }

  clearCart(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart/${userId}`, { headers: this.getHeaders() });
  }

  // ==================== UTILISATEURS API ====================
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`, { headers: this.getHeaders() });
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${id}`, { headers: this.getHeaders() });
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user, { headers: this.getHeaders() });
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, user, { headers: this.getHeaders() });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`, { headers: this.getHeaders() });
  }

  // ==================== AUTHENTIFICATION API ====================
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/logout`, {}, { headers: this.getHeaders() });
  }

  refreshToken(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/refresh`, {}, { headers: this.getHeaders() });
  }

  // ==================== STATISTIQUES API ====================
  getDashboardStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats/dashboard`, { headers: this.getHeaders() });
  }

  getSalesStats(period: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats/sales?period=${period}`, { headers: this.getHeaders() });
  }

  getProductStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats/products`, { headers: this.getHeaders() });
  }

  // ==================== FICHIERS API ====================
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload`, formData, { headers: this.getHeaders() });
  }

  // Méthode spécifique pour l'upload d'images de produits
  uploadImage(file: File): Observable<{success: boolean, path: string, url: string, filename: string}> {
    const formData = new FormData();
    formData.append('image', file);
    
    // Pour les uploads, ne pas mettre Content-Type pour laisser le browser le définir
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    });
    
    return this.http.post<{success: boolean, path: string, url: string, filename: string}>(
      `${this.apiUrl}/upload/image`,
      formData,
      { headers }
    );
  }

  // Méthode helper pour obtenir l'URL complète d'une image
  getImageUrl(imagePath: string): string {
    if (!imagePath) return '';
    
    // Si c'est déjà une URL complète (http:// ou https://), la retourner telle quelle
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // Si c'est un chemin relatif commençant par /api/uploads, construire l'URL complète
    if (imagePath.startsWith('/api/uploads')) {
      const baseUrl = this.apiUrl.replace('/api', '');
      return `${baseUrl}${imagePath}`;
    }
    
    // Sinon, c'est probablement un chemin assets (pour les anciennes images)
    return imagePath;
  }

  deleteFile(filename: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/upload/${filename}`, { headers: this.getHeaders() });
  }

  // ==================== CONFIGURATION API ====================
  getSettings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/settings`, { headers: this.getHeaders() });
  }

  updateSettings(settings: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/settings`, settings, { headers: this.getHeaders() });
  }
}
