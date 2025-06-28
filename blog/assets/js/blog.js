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
    
    this.init();
  }
  
  async init() {
    await this.loadPosts();
    this.setupEventListeners();
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
        title: "Why Every Engineer Should Learn to Cook",
        slug: "engineers-should-learn-cooking",
        category: "everything-else",
        categoryName: "Everything Else",
        excerpt: "Exploring the surprising parallels between engineering problem-solving and culinary arts, and how cooking can make you a better engineer.",
        content: "",
        author: "Sapan Agrawal",
        date: "2023-12-15",
        readTime: "4 min read",
        tags: ["Engineering", "Cooking", "Skills", "Creativity"],
        image: "/blog/assets/images/engineering-cooking-thumbnail.jpg",
        featured: false
      }
    ];
    
    this.filteredPosts = [...this.posts];
  }
  
  setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('blog-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase();
        this.filterPosts();
      });
    }
    
    // Category filters
    const categoryFilters = document.querySelectorAll('.category-filter');
    categoryFilters.forEach(filter => {
      filter.addEventListener('click', (e) => {
        e.preventDefault();
        this.currentCategory = filter.dataset.category;
        this.updateActiveFilter(filter);
        this.filterPosts();
      });
    });
    
    // Blog card clicks
    document.addEventListener('click', (e) => {
      const blogCard = e.target.closest('.blog-card');
      if (blogCard) {
        const postId = blogCard.dataset.postId;
        this.openPost(postId);
      }
    });
    
    // Social share buttons
    document.addEventListener('click', (e) => {
      if (e.target.closest('.share-btn')) {
        e.preventDefault();
        const platform = e.target.closest('.share-btn').dataset.platform;
        this.sharePost(platform);
      }
    });
  }
  
  filterPosts() {
    this.filteredPosts = this.posts.filter(post => {
      const matchesCategory = this.currentCategory === 'all' || post.category === this.currentCategory;
      const matchesSearch = !this.searchQuery || 
        post.title.toLowerCase().includes(this.searchQuery) ||
        post.excerpt.toLowerCase().includes(this.searchQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(this.searchQuery));
      
      return matchesCategory && matchesSearch;
    });
    
    this.currentPage = 1;
    this.renderPosts();
    this.renderPagination();
  }
  
  updateActiveFilter(activeFilter) {
    document.querySelectorAll('.category-filter').forEach(filter => {
      filter.classList.remove('active');
    });
    activeFilter.classList.add('active');
  }
  
  updateCategoryFilters() {
    const categories = [
      { key: 'all', name: 'All Posts', count: this.posts.length },
      { key: 'rl-ai', name: 'RL & AI', count: this.posts.filter(p => p.category === 'rl-ai').length },
      { key: 'travel', name: 'Travel', count: this.posts.filter(p => p.category === 'travel').length },
      { key: 'food', name: 'Food', count: this.posts.filter(p => p.category === 'food').length },
      { key: 'life', name: 'Life', count: this.posts.filter(p => p.category === 'life').length },
      { key: 'everything-else', name: 'Everything Else', count: this.posts.filter(p => p.category === 'everything-else').length }
    ];
    
    const filtersContainer = document.querySelector('.category-filters');
    if (filtersContainer) {
      filtersContainer.innerHTML = categories.map(cat => `
        <a href="#" class="category-filter ${cat.key === 'all' ? 'active' : ''}" data-category="${cat.key}">
          ${cat.name} (${cat.count})
        </a>
      `).join('');
    }
  }
  
  renderPosts() {
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    const postsToShow = this.filteredPosts.slice(startIndex, endIndex);
    
    const gridContainer = document.querySelector('.blog-grid');
    if (!gridContainer) return;
    
    if (postsToShow.length === 0) {
      gridContainer.innerHTML = `
        <div class="no-posts">
          <h3>No posts found</h3>
          <p>Try adjusting your search or filter criteria.</p>
        </div>
      `;
      return;
    }
    
    gridContainer.innerHTML = postsToShow.map(post => `
      <article class="blog-card" data-post-id="${post.id}">
        <div class="blog-card-image" style="background: linear-gradient(135deg, ${this.getCategoryColor(post.category)});">
          ${post.demo ? '<div class="demo-badge">Interactive Demo</div>' : ''}
        </div>
        <div class="blog-card-content">
          <span class="blog-card-category">${post.categoryName}</span>
          <h3 class="blog-card-title">${post.title}</h3>
          <p class="blog-card-excerpt">${post.excerpt}</p>
          <div class="blog-card-meta">
            <div class="blog-card-date">
              <i class="fas fa-calendar-alt"></i>
              ${this.formatDate(post.date)} • ${post.readTime}
            </div>
            <div class="blog-card-tags">
              ${post.tags.slice(0, 2).map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
            </div>
          </div>
        </div>
      </article>
    `).join('');
  }
  
  renderPagination() {
    const totalPages = Math.ceil(this.filteredPosts.length / this.postsPerPage);
    const paginationContainer = document.querySelector('.blog-pagination');
    
    if (!paginationContainer || totalPages <= 1) {
      if (paginationContainer) paginationContainer.style.display = 'none';
      return;
    }
    
    paginationContainer.style.display = 'flex';
    
    let paginationHTML = '';
    
    // Previous button
    if (this.currentPage > 1) {
      paginationHTML += `<button class="pagination-btn" onclick="blogManager.goToPage(${this.currentPage - 1})">Previous</button>`;
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      if (i === this.currentPage) {
        paginationHTML += `<button class="pagination-btn active">${i}</button>`;
      } else {
        paginationHTML += `<button class="pagination-btn" onclick="blogManager.goToPage(${i})">${i}</button>`;
      }
    }
    
    // Next button
    if (this.currentPage < totalPages) {
      paginationHTML += `<button class="pagination-btn" onclick="blogManager.goToPage(${this.currentPage + 1})">Next</button>`;
    }
    
    paginationContainer.innerHTML = paginationHTML;
  }
  
  goToPage(page) {
    this.currentPage = page;
    this.renderPosts();
    this.renderPagination();
    
    // Smooth scroll to top of posts
    document.querySelector('.blog-grid').scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
  
  getCategoryColor(category) {
    const colors = {
      'rl-ai': '#667eea 0%, #764ba2 100%',
      'travel': '#f093fb 0%, #f5576c 100%',
      'food': '#4facfe 0%, #00f2fe 100%',
      'life': '#43e97b 0%, #38f9d7 100%',
      'everything-else': '#fa709a 0%, #fee140 100%'
    };
    return colors[category] || '#667eea 0%, #764ba2 100%';
  }
  
  formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  
  openPost(postId) {
    const post = this.posts.find(p => p.id == postId);
    if (post) {
      if (post.demo && post.demoUrl) {
        // Open interactive demo
        window.open(post.demoUrl, '_blank');
      } else {
        // Navigate to blog post page
        window.location.href = `/blog/posts/${post.category}/${post.slug}.html`;
      }
    }
  }
  
  sharePost(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      reddit: `https://reddit.com/submit?url=${url}&title=${title}`
    };
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  }
  
  // Search suggestions
  setupSearchSuggestions() {
    const searchInput = document.getElementById('blog-search');
    const suggestionsList = document.getElementById('search-suggestions');
    
    if (!searchInput || !suggestionsList) return;
    
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      
      if (query.length < 2) {
        suggestionsList.style.display = 'none';
        return;
      }
      
      const suggestions = this.posts
        .filter(post => 
          post.title.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query))
        )
        .slice(0, 5)
        .map(post => ({
          title: post.title,
          category: post.categoryName,
          id: post.id
        }));
      
      if (suggestions.length > 0) {
        suggestionsList.innerHTML = suggestions.map(suggestion => `
          <div class="suggestion-item" data-post-id="${suggestion.id}">
            <span class="suggestion-title">${suggestion.title}</span>
            <span class="suggestion-category">${suggestion.category}</span>
          </div>
        `).join('');
        suggestionsList.style.display = 'block';
      } else {
        suggestionsList.style.display = 'none';
      }
    });
    
    // Handle suggestion clicks
    suggestionsList.addEventListener('click', (e) => {
      const suggestionItem = e.target.closest('.suggestion-item');
      if (suggestionItem) {
        const postId = suggestionItem.dataset.postId;
        this.openPost(postId);
        suggestionsList.style.display = 'none';
        searchInput.value = '';
      }
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !suggestionsList.contains(e.target)) {
        suggestionsList.style.display = 'none';
      }
    });
  }
}

// Initialize blog manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.blogManager = new BlogManager();
});

// Smooth scrolling for anchor links
document.addEventListener('click', (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});

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

// Call lazy loading observer
document.addEventListener('DOMContentLoaded', observeImages);
