// Independent Blog JavaScript - Enhanced with Modern Features
// Inspired by DeepMind's blog functionality

class IndependentBlogManager {
  constructor() {
    this.posts = [];
    this.filteredPosts = [];
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.currentPage = 1;
    this.postsPerPage = 6;
    this.isLoading = false;
    this.fullscreenModal = null;
    this.categoryDropdown = null;
    this.currentView = 'grid'; // Add view state
    
    this.init();
  }
  
  async init() {
    await this.loadPosts();
    this.setupEventListeners();
    this.setupModalControls();
    this.filterPosts(); // Initialize filtered posts
    this.renderPosts();
    this.updateCategoryFilters();
    this.initScrollAnimations();
  }
  
  async loadPosts() {
    // Enhanced post data with more realistic content
    this.posts = [
      {
        id: 1,
        title: "Markov Decision Processes: Interactive Grid World Visualization",
        slug: "mdp-grid-world-visualization",
        category: "rl-ai",
        categoryName: "Reinforcement Learning & AI",
        excerpt: "Explore the fundamentals of Markov Decision Processes through an interactive grid world demonstration featuring value iteration, policy visualization, and real-time algorithm analysis.",
        content: "", 
        author: "Sapan Agrawal",
        date: "2024-01-15",
        readTime: "8 min read",
        tags: ["Reinforcement Learning", "MDP", "Value Iteration", "Interactive Demo"],
        image: "/blog/assets/images/mdp-grid-world-thumbnail.jpg",
        featured: true,
        demo: true,
        demoUrl: "/mdp_grid_world.html"
      },
      {
        id: 2,
        title: "Deep Q-Networks: From Theory to Implementation",
        slug: "deep-q-networks-theory-implementation",
        category: "rl-ai",
        categoryName: "Reinforcement Learning & AI",
        excerpt: "A comprehensive guide to understanding and implementing Deep Q-Networks, including experience replay, target networks, and practical considerations for stable training.",
        content: "",
        author: "Sapan Agrawal",
        date: "2024-01-10",
        readTime: "12 min read",
        tags: ["Deep Learning", "Q-Learning", "Neural Networks", "PyTorch"],
        image: "/blog/assets/images/dqn-thumbnail.jpg",
        featured: false
      },
      {
        id: 3,
        title: "Exploring Tokyo: A Roboticist's Guide to Tech Culture",
        slug: "tokyo-tech-culture-guide",
        category: "travel",
        categoryName: "Travel",
        excerpt: "From robot cafes to cutting-edge research labs, discover Tokyo through the lens of a robotics enthusiast and explore the intersection of tradition and innovation.",
        content: "",
        author: "Sapan Agrawal",
        date: "2024-01-05",
        readTime: "6 min read",
        tags: ["Tokyo", "Technology", "Robotics", "Culture"],
        image: "/blog/assets/images/tokyo-travel-thumbnail.jpg",
        featured: false
      },
      {
        id: 4,
        title: "The Science of Perfect Ramen: Temperature, Timing, and Texture",
        slug: "science-perfect-ramen",
        category: "food",
        categoryName: "Food",
        excerpt: "Applying engineering principles to understand the physics and chemistry behind the perfect bowl of ramen, from noodle elasticity to broth emulsification.",
        content: "",
        author: "Sapan Agrawal",
        date: "2024-01-01",
        readTime: "5 min read",
        tags: ["Food Science", "Ramen", "Chemistry", "Physics"],
        image: "/blog/assets/images/ramen-science-thumbnail.jpg",
        featured: false
      },
      {
        id: 5,
        title: "Lessons from Graduate School: Balancing Research and Life",
        slug: "graduate-school-research-life-balance",
        category: "life",
        categoryName: "Life",
        excerpt: "Reflections on navigating the challenges of graduate research, maintaining work-life balance, and finding meaning in the pursuit of knowledge.",
        content: "",
        author: "Sapan Agrawal",
        date: "2023-12-20",
        readTime: "7 min read",
        tags: ["Graduate School", "Research", "Work-Life Balance", "Personal Growth"],
        image: "/blog/assets/images/grad-school-life-thumbnail.jpg",
        featured: false
      },
      {
        id: 6,
        title: "The Philosophy of Code: Lessons from Open Source",
        slug: "philosophy-of-code-open-source",
        category: "everything-else",
        categoryName: "Everything Else",
        excerpt: "Exploring the deeper meaning behind collaborative coding, the ethics of open source, and how programming philosophy shapes our digital world.",
        content: "",
        author: "Sapan Agrawal",
        date: "2023-12-15",
        readTime: "9 min read",
        tags: ["Philosophy", "Open Source", "Programming", "Ethics"],
        image: "/blog/assets/images/code-philosophy-thumbnail.jpg",
        featured: false
      },
      {
        id: 7,
        title: "Policy Gradient Methods: REINFORCE and Beyond",
        slug: "policy-gradient-methods-reinforce",
        category: "rl-ai",
        categoryName: "Reinforcement Learning & AI",
        excerpt: "Deep dive into policy gradient algorithms, from vanilla REINFORCE to advanced actor-critic methods, with practical implementation tips.",
        content: "",
        author: "Sapan Agrawal",
        date: "2023-12-10",
        readTime: "15 min read",
        tags: ["Policy Gradients", "REINFORCE", "Actor-Critic", "RL"],
        image: "/blog/assets/images/policy-gradient-thumbnail.jpg",
        featured: false
      },
      {
        id: 8,
        title: "Hidden Gems of Kyoto: Beyond the Tourist Trail",
        slug: "hidden-gems-kyoto-beyond-tourist-trail",
        category: "travel",
        categoryName: "Travel",
        excerpt: "Discovering the lesser-known temples, gardens, and experiences in Kyoto that offer authentic glimpses into traditional Japanese culture.",
        content: "",
        author: "Sapan Agrawal",
        date: "2023-12-05",
        readTime: "6 min read",
        tags: ["Kyoto", "Japan", "Culture", "Hidden Gems"],
        image: "/blog/assets/images/kyoto-hidden-thumbnail.jpg",
        featured: false
      }
    ];
    
    this.filteredPosts = [...this.posts];
  }
  
  setupEventListeners() {
    // Category dropdown
    this.categoryDropdown = document.getElementById('category-filter');
    if (this.categoryDropdown) {
      this.categoryDropdown.addEventListener('change', (e) => {
        this.handleCategoryFilter(e.target.value);
      });
    }
    
    // View toggle buttons
    const viewToggleButtons = document.querySelectorAll('.view-toggle__btn');
    viewToggleButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const view = e.currentTarget.dataset.view;
        this.switchView(view);
      });
    });
    
    // Legacy filter buttons (if they exist)
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.handleCategoryFilter(e.target.dataset.filter);
      });
    });
    
    // Pagination click handlers
    document.addEventListener('click', (e) => {
      if (e.target.matches('.pagination-btn:not(.disabled)')) {
        e.preventDefault();
        const page = parseInt(e.target.dataset.page);
        if (!isNaN(page)) {
          this.goToPage(page);
        }
      }
    });
    
    // Load more button (legacy)
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        this.loadMorePosts();
      });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        this.handleNewsletterSubmit(e);
      });
    }
  }
  
  setupModalControls() {
    // Simplified demo functionality - no complex modal needed
    // Demo posts will open directly in new tab
  }
  
  // Removed complex fullscreen demo functionality
  // Demo posts now open directly in new tab for simplicity
  
  handleCategoryFilter(category) {
    // Update active filter button (legacy support)
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.filter === category) {
        btn.classList.add('active');
      }
    });
    
    // Update dropdown selection
    if (this.categoryDropdown && this.categoryDropdown.value !== category) {
      this.categoryDropdown.value = category;
    }
    
    this.currentCategory = category;
    this.currentPage = 1; // Reset to first page
    this.filterPosts();
    this.renderPosts();
    this.renderPagination();
    
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'category_filter', {
        'event_category': 'engagement',
        'event_label': category
      });
    }
  }
  
  goToPage(page) {
    const totalPages = Math.ceil(this.filteredPosts.length / this.postsPerPage);
    if (page >= 1 && page <= totalPages) {
      this.currentPage = page;
      this.renderPosts();
      this.renderPagination();
      
      // Scroll to posts section
      const postsSection = document.querySelector('.posts-section');
      if (postsSection) {
        postsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      
      // Analytics tracking
      if (typeof gtag !== 'undefined') {
        gtag('event', 'page_navigation', {
          'event_category': 'engagement',
          'event_label': `page_${page}`
        });
      }
    }
  }
  
  filterPosts() {
    this.filteredPosts = this.posts.filter(post => {
      const matchesCategory = this.currentCategory === 'all' || post.category === this.currentCategory;
      const matchesSearch = !this.searchQuery || 
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(this.searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }
  
  renderPosts() {
    const postsGrid = document.getElementById('posts-grid');
    if (!postsGrid) return;
    
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    const postsToShow = this.filteredPosts.slice(startIndex, endIndex);
    
    // Clear grid and show current page posts
    postsGrid.innerHTML = '';
    
    if (postsToShow.length === 0) {
      postsGrid.innerHTML = `
        <div class="no-posts-message">
          <h3>No posts found</h3>
          <p>Try adjusting your filters or check back later for new content.</p>
        </div>
      `;
      return;
    }
    
    // Render posts for current page
    postsToShow.forEach(post => {
      const postElement = this.createPostCard(post);
      postsGrid.appendChild(postElement);
    });
    
    // Update pagination
    this.renderPagination();
    
    // Add scroll animations
    this.animateNewPosts();
  }
  
  renderPagination() {
    const paginationContainer = document.getElementById('pagination-container');
    if (!paginationContainer) return;
    
    const totalPages = Math.ceil(this.filteredPosts.length / this.postsPerPage);
    
    if (totalPages <= 1) {
      paginationContainer.style.display = 'none';
      return;
    }
    
    paginationContainer.style.display = 'flex';
    
    let paginationHTML = '';
    
    // Previous button
    if (this.currentPage > 1) {
      paginationHTML += `<a href="#" class="blog-pagination__item" data-page="${this.currentPage - 1}">
        <i class="fas fa-chevron-left"></i>
      </a>`;
    }
    
    // Page numbers
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(totalPages, this.currentPage + 2);
    
    if (startPage > 1) {
      paginationHTML += `<a href="#" class="blog-pagination__item" data-page="1">1</a>`;
      if (startPage > 2) {
        paginationHTML += `<span class="blog-pagination__item blog-pagination__ellipsis">...</span>`;
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      const isActive = i === this.currentPage ? 'blog-pagination__item--current' : '';
      paginationHTML += `<a href="#" class="blog-pagination__item ${isActive}" data-page="${i}">${i}</a>`;
    }
    
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationHTML += `<span class="blog-pagination__item blog-pagination__ellipsis">...</span>`;
      }
      paginationHTML += `<a href="#" class="blog-pagination__item" data-page="${totalPages}">${totalPages}</a>`;
    }
    
    // Next button
    if (this.currentPage < totalPages) {
      paginationHTML += `<a href="#" class="blog-pagination__item" data-page="${this.currentPage + 1}">
        <i class="fas fa-chevron-right"></i>
      </a>`;
    }
    
    paginationContainer.innerHTML = paginationHTML;
    
    // Add event listeners to pagination links
    const paginationLinks = paginationContainer.querySelectorAll('.blog-pagination__item:not(.blog-pagination__item--current)');
    paginationLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = parseInt(link.dataset.page);
        if (page && page !== this.currentPage) {
          this.goToPage(page);
        }
      });
    });
  }
  
  goToPage(page) {
    this.currentPage = page;
    this.renderPosts();
    
    // Smooth scroll to top of posts
    const postsSection = document.getElementById('featured-post');
    if (postsSection) {
      postsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_change', {
        'event_category': 'engagement',
        'event_label': `page_${page}`
      });
    }
  }
  
  filterPosts() {
    this.filteredPosts = this.posts.filter(post => {
      const matchesCategory = this.currentCategory === 'all' || post.category === this.currentCategory;
      const matchesSearch = !this.searchQuery || 
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(this.searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }
  
  renderPosts() {
    const postsGrid = document.getElementById('posts-grid');
    if (!postsGrid) return;
    
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    const postsToShow = this.filteredPosts.slice(startIndex, endIndex);
    
    // Clear grid and show current page posts
    postsGrid.innerHTML = '';
    
    if (postsToShow.length === 0) {
      postsGrid.innerHTML = `
        <div class="no-posts-message">
          <h3>No posts found</h3>
          <p>Try adjusting your filters or check back later for new content.</p>
        </div>
      `;
      return;
    }
    
    // Render posts for current page
    postsToShow.forEach(post => {
      const postElement = this.createPostCard(post);
      postsGrid.appendChild(postElement);
    });
    
    // Update pagination
    this.renderPagination();
    
    // Add scroll animations
    this.animateNewPosts();
  }
  
  renderPagination() {
    const paginationContainer = document.getElementById('pagination-container');
    if (!paginationContainer) return;
    
    const totalPages = Math.ceil(this.filteredPosts.length / this.postsPerPage);
    
    if (totalPages <= 1) {
      paginationContainer.style.display = 'none';
      return;
    }
    
    paginationContainer.style.display = 'flex';
    
    let paginationHTML = '';
    
    // Previous button
    if (this.currentPage > 1) {
      paginationHTML += `<a href="#" class="blog-pagination__item" data-page="${this.currentPage - 1}">
        <i class="fas fa-chevron-left"></i>
      </a>`;
    }
    
    // Page numbers
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(totalPages, this.currentPage + 2);
    
    if (startPage > 1) {
      paginationHTML += `<a href="#" class="blog-pagination__item" data-page="1">1</a>`;
      if (startPage > 2) {
        paginationHTML += `<span class="blog-pagination__item blog-pagination__ellipsis">...</span>`;
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      const isActive = i === this.currentPage ? 'blog-pagination__item--current' : '';
      paginationHTML += `<a href="#" class="blog-pagination__item ${isActive}" data-page="${i}">${i}</a>`;
    }
    
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationHTML += `<span class="blog-pagination__item blog-pagination__ellipsis">...</span>`;
      }
      paginationHTML += `<a href="#" class="blog-pagination__item" data-page="${totalPages}">${totalPages}</a>`;
    }
    
    // Next button
    if (this.currentPage < totalPages) {
      paginationHTML += `<a href="#" class="blog-pagination__item" data-page="${this.currentPage + 1}">
        <i class="fas fa-chevron-right"></i>
      </a>`;
    }
    
    paginationContainer.innerHTML = paginationHTML;
    
    // Add event listeners to pagination links
    const paginationLinks = paginationContainer.querySelectorAll('.blog-pagination__item:not(.blog-pagination__item--current)');
    paginationLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = parseInt(link.dataset.page);
        if (page && page !== this.currentPage) {
          this.goToPage(page);
        }
      });
    });
  }
  
  goToPage(page) {
    this.currentPage = page;
    this.renderPosts();
    
    // Smooth scroll to top of posts
    const postsSection = document.getElementById('featured-post');
    if (postsSection) {
      postsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_change', {
        'event_category': 'engagement',
        'event_label': `page_${page}`
      });
    }
  }
  
  createPostCard(post) {
    const postCard = document.createElement('article');
    postCard.className = 'blog-card blog-card--gradient';
    postCard.dataset.category = post.category;
    
    // Determine if post should have external link
    const isDemo = post.demo && post.id === 1;
    const href = isDemo ? '/mdp_grid_world.html' : '#';
    const target = isDemo ? '_blank' : '_self';
    
    // Use appropriate static images based on category
    let imageSrc = '../images/profile/01_sapan_agrawal.jpg'; // Default
    switch(post.category) {
      case 'rl-ai':
        imageSrc = '/blog/assets/images/mdp-grid-world-thumbnail.jpg';
        break;
      case 'travel':
        imageSrc = '../images/profile/01_sapan_agrawal.jpg';
        break;
      case 'food':
        imageSrc = '../images/profile/01_sapan_agrawal.jpg';
        break;
      case 'life':
        imageSrc = '../images/profile/01_sapan_agrawal.jpg';
        break;
      default:
        imageSrc = '../images/profile/01_sapan_agrawal.jpg';
    }
    
    // Use the same card design for both views - only CSS layout differs
    postCard.innerHTML = `
      <a href="${href}" target="${target}" class="blog-card__link">
        ${post.demo ? '<div class="demo-badge">Interactive Demo</div>' : ''}
        <div class="blog-card__image">
          <img src="${imageSrc}" alt="${post.title}" loading="lazy">
        </div>
        <div class="blog-card__content">
          <div class="blog-card__category">${post.categoryName}</div>
          <h3 class="blog-card__title">${post.title}</h3>
          <p class="blog-card__description">${post.excerpt}</p>
          <div class="blog-card__footer">
            <span class="blog-card__date">${this.formatDate(post.date)}</span>
            <div class="blog-card__arrow">
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </a>
    `;
    
    // Add click handler for non-demo posts
    if (!isDemo) {
      postCard.addEventListener('click', (e) => {
        e.preventDefault();
        this.showNotification(`"${post.title}" - Full article coming soon!`, 'info');
        
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
          gtag('event', 'post_click', {
            'event_category': 'engagement',
            'event_label': post.slug
          });
        }
      });
    } else {
      // For demo posts, add analytics tracking
      postCard.addEventListener('click', () => {
        if (typeof gtag !== 'undefined') {
          gtag('event', 'demo_post_click', {
            'event_category': 'engagement',
            'event_label': post.slug
          });
        }
      });
    }
    
    return postCard;
  }
  
  navigateToPost(post) {
    // Navigate to the post page - construct absolute path from blog root
    const currentPath = window.location.pathname;
    let postUrl;
    
    if (currentPath.includes('/categories/')) {
      // We're on a category page, need to go up one level
      postUrl = `../posts/${post.category}/${post.slug}.html`;
    } else {
      // We're on the main blog page
      postUrl = `posts/${post.category}/${post.slug}.html`;
    }
    
    window.location.href = postUrl;
  }
  
  loadMorePosts() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    const nextPage = this.currentPage + 1;
    const totalPages = Math.ceil(this.filteredPosts.length / this.postsPerPage);
    
    if (nextPage <= totalPages) {
      setTimeout(() => {
        this.goToPage(nextPage);
        this.isLoading = false;
      }, 500);
    } else {
      this.isLoading = false;
    }
  }
  
  updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('load-more');
    const loadMoreContainer = document.querySelector('.load-more-container');
    
    if (!loadMoreBtn || !loadMoreContainer) return;
    
    const totalShown = this.currentPage * this.postsPerPage;
    const hasMore = totalShown < this.filteredPosts.length;
    
    if (hasMore) {
      loadMoreContainer.style.display = 'block';
      loadMoreBtn.textContent = this.isLoading ? 'Loading...' : 'Load More';
      loadMoreBtn.disabled = this.isLoading;
    } else {
      loadMoreContainer.style.display = 'none';
    }
  }
  
  enhancedAnimations() {
    // Enhanced animation for post cards
    const newCards = document.querySelectorAll('.post-card:not(.animated)');
    newCards.forEach((card, index) => {
      card.classList.add('animated');
      card.style.animationDelay = `${index * 0.1}s`;
    });
  }
  
  initScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.post-card, .demo-container, .section-header').forEach(el => {
      observer.observe(el);
    });
  }

  animateNewPosts() {
    // Add animation to newly rendered posts
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Get all post cards that don't already have the fade-in class
    const newPostCards = document.querySelectorAll('.post-card:not(.fade-in)');
    newPostCards.forEach((card, index) => {
      // Add a slight delay for staggered animation
      setTimeout(() => {
        observer.observe(card);
      }, index * 100);
    });
  }
  
  updateCategoryFilters() {
    // Update category counts in dropdown
    const categories = {};
    this.posts.forEach(post => {
      categories[post.category] = (categories[post.category] || 0) + 1;
    });
    
    if (this.categoryDropdown) {
      const options = this.categoryDropdown.querySelectorAll('option:not([value="all"])');
      options.forEach(option => {
        const category = option.value;
        const count = categories[category] || 0;
        const originalText = option.textContent.replace(/ \(\d+\)$/, '');
        option.textContent = `${originalText} (${count})`;
      });
    }
  }
  
  handleNewsletterSubmit(e) {
    e.preventDefault();
    const input = e.target.querySelector('.newsletter-input');
    const button = e.target.querySelector('.newsletter-btn');
    
    if (!input.value.trim()) {
      this.showNotification('Please enter a valid email address', 'error');
      return;
    }
    
    const originalText = button.textContent;
    button.textContent = 'Subscribing...';
    button.disabled = true;
    
    // Simulate subscription process
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      input.value = '';
      this.showNotification('Thank you for subscribing!', 'success');
    }, 1500);
    
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'newsletter_signup', {
        'event_category': 'engagement'
      });
    }
  }
  
  showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button class="notification-close">×</button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }
  
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  setupSmoothScrolling() {
    // Smooth scrolling for internal links
    document.addEventListener('click', (e) => {
      if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  }

  // Legacy method compatibility
  loadMorePosts() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    const nextPage = this.currentPage + 1;
    const totalPages = Math.ceil(this.filteredPosts.length / this.postsPerPage);
    
    if (nextPage <= totalPages) {
      setTimeout(() => {
        this.goToPage(nextPage);
        this.isLoading = false;
      }, 500);
    } else {
      this.isLoading = false;
    }
  }

  // Search functionality for future enhancement
  handleSearch(query) {
    this.searchQuery = query.trim();
    this.currentPage = 1;
    this.filterPosts();
    this.renderPosts();
    
    // Analytics tracking
    if (typeof gtag !== 'undefined' && query.trim()) {
      gtag('event', 'search', {
        'event_category': 'engagement',
        'search_term': query.trim()
      });
    }
  }
  
  switchView(view) {
    if (view === this.currentView) return;
    
    this.currentView = view;
    
    // Update toggle button states
    const toggleButtons = document.querySelectorAll('.view-toggle__btn');
    toggleButtons.forEach(btn => {
      btn.classList.remove('view-toggle__btn--active');
      if (btn.dataset.view === view) {
        btn.classList.add('view-toggle__btn--active');
      }
    });
    
    // Re-render posts with new view
    this.renderPosts();
    
    // Update posts grid class AFTER rendering (because renderPosts clears classes)
    const postsGrid = document.getElementById('posts-grid');
    if (postsGrid) {
      // Remove all view classes
      postsGrid.classList.remove('blog-grid--view-grid', 'blog-grid--view-slide');
      
      // Add new view class
      if (view === 'slide') {
        postsGrid.classList.add('blog-grid--view-slide');
      } else {
        postsGrid.classList.add('blog-grid--view-grid');
      }
    }
    
    // Show notification
    this.showNotification(`Switched to ${view} view`, 'success');
  }
}

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize the blog when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new IndependentBlogManager();
});

// Export for global access if needed
window.IndependentBlogManager = IndependentBlogManager;

// Lazy loading for images
const observeImages = () => {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
};

// Social sharing functionality
const setupSocialSharing = () => {
  const shareButtons = document.querySelectorAll('.share-btn');
  shareButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const platform = btn.dataset.platform;
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);
      
      let shareUrl = '';
      switch (platform) {
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
          break;
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          break;
      }
      
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
    });
  });
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.blogManager = new IndependentBlogManager();
  observeImages();
  setupSocialSharing();
});

// Performance optimization: Preload critical resources
const preloadCriticalResources = () => {
  // Preload important fonts
  const fontPreload = document.createElement('link');
  fontPreload.rel = 'preload';
  fontPreload.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
  fontPreload.as = 'style';
  document.head.appendChild(fontPreload);
};

// Call preload on page load
window.addEventListener('load', preloadCriticalResources);

// Error handling for failed image loads
document.addEventListener('error', (e) => {
  if (e.target.tagName === 'IMG') {
    e.target.style.display = 'none';
    console.warn('Failed to load image:', e.target.src);
  }
}, true);

// Export for potential use in other modules
window.IndependentBlogManager = IndependentBlogManager;
