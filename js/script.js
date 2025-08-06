// side bar start  

// ============= Animated Cursor Functionality =============
document.addEventListener('DOMContentLoaded', function() {
    // Check if device supports hover (desktop/laptop)
    if (window.matchMedia("(hover: hover)").matches) {
        initCustomCursor();
    }
});

function initCustomCursor() {
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    const cursorWaves = document.querySelectorAll('.cursor-wave');
    
    if (!cursorDot || !cursorOutline) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    // Mouse movement tracking
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update cursor dot position immediately
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
        
        // Update wave positions
        cursorWaves.forEach(wave => {
            wave.style.left = mouseX + 'px';
            wave.style.top = mouseY + 'px';
        });
    });
    
    // Smooth cursor outline animation
    function animateOutline() {
        const distX = mouseX - outlineX;
        const distY = mouseY - outlineY;
        
        outlineX += distX * 0.15;
        outlineY += distY * 0.15;
        
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateOutline);
    }
    animateOutline();
    
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn_hover1, .btn_hover2, .navbar-toggler, .tablinks, input, textarea, select');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            document.body.classList.add('cursor-hover-effect');
        });
        
        element.addEventListener('mouseleave', function() {
            document.body.classList.remove('cursor-hover-effect');
        });
    });
    
    // Click effects
    document.addEventListener('mousedown', function() {
        cursorDot.classList.add('cursor-click');
        
        // Create click wave effect
        cursorWaves.forEach((wave, index) => {
            setTimeout(() => {
                wave.classList.add('cursor-wave-click');
                setTimeout(() => {
                    wave.classList.remove('cursor-wave-click');
                }, 600);
            }, index * 100);
        });
        
        setTimeout(() => {
            cursorDot.classList.remove('cursor-click');
        }, 300);
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', function() {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
        cursorWaves.forEach(wave => {
            wave.style.opacity = '0';
        });
    });
    
    // Show cursor when entering window
    document.addEventListener('mouseenter', function() {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });
    
    // Special effects for buttons with specific classes
    const specialButtons = document.querySelectorAll('.btn_hover1, .btn_hover2');
    specialButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            document.body.classList.add('cursor-hover-effect');
            
            // Add extra glow effect
            cursorDot.style.boxShadow = '0 0 35px rgba(16, 185, 129, 0.9), 0 0 70px rgba(16, 185, 129, 0.4)';
            
            // Animate waves more intensely
            cursorWaves.forEach((wave, index) => {
                wave.style.borderColor = `rgba(16, 185, 129, ${0.8 - index * 0.2})`;
                wave.style.animationDuration = '1.2s';
            });
        });
        
        button.addEventListener('mouseleave', function() {
            document.body.classList.remove('cursor-hover-effect');
            cursorDot.style.boxShadow = '';
            
            cursorWaves.forEach((wave, index) => {
                wave.style.borderColor = `rgba(59, 130, 246, ${0.7 - index * 0.2})`;
                wave.style.animationDuration = '1.8s';
            });
        });
    });
}

function openNav() {
   "use strict";
   const sidepanel = document.getElementById("mySidepanel");
   if (sidepanel) {
       sidepanel.style.left = "0";
   } else {
       console.error("Error: Side panel element not found!");
   }
}

function closeNav() {
   "use strict";
   const sidepanel = document.getElementById("mySidepanel");
   if (sidepanel) {
       sidepanel.style.left = "-320px";
   } else {
       console.error("Error: Side panel element not found!");
   }
}


function toggleCollapse(elementId) {
   var element = document.getElementById(elementId);
   var button = document.querySelector('.collapse_btn a');

   // Toggle the 'show' class
   element.classList.toggle('show');

   // Toggle aria-expanded attribute
   var isExpanded = button.getAttribute('aria-expanded') === 'true';
   button.setAttribute('aria-expanded', !isExpanded);
}

// search-bar
function open_search_bar() {
   "use strict";
   const sidepanel = document.getElementById("search-bar");
   if (sidepanel) {
       sidepanel.style.height = "100vh";
       sidepanel.style.borderRadius = "0";
   } else {
       console.error("Error: Side panel element not found!");
   }
}

function close_search_bar() {
   "use strict";
   const sidepanel = document.getElementById("search-bar");
   if (sidepanel) {
       sidepanel.style.height = "0";
       sidepanel.style.borderTopLeftRadius = "100%";
       sidepanel.style.borderTopRightRadius = "100%";
   } else {
       console.error("Error: Side panel element not found!");
   }
}

// right-sidebar
function open_right_side() {
   "use strict";
   const sidepanel = document.getElementById("right_side");
   if (sidepanel) {
       sidepanel.style.right = "0";
   } else {
       console.error("Error: Side panel element not found!");
   }
}

function close_right_sade() {
   "use strict";
   const sidepanel = document.getElementById("right_side");
   if (sidepanel) {
       sidepanel.style.right = "-355px";
   } else {
       console.error("Error: Side panel element not found!");
   }
}


function scrollFunction() {
   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
       document.getElementById("backToTopBtn").style.display = "block";
   } else {
       document.getElementById("backToTopBtn").style.display = "none";
   }
}

function scrollToTop() {
   const scrollToTopBtn = document.documentElement || document.body;
   scrollToTopBtn.scrollIntoView({
       behavior: "smooth"
   });
}



// portfolio gallary tab
function open_img(evt, cityName) {
   var i, tabcontent, tablinks;

   // Hide all tab content
   tabcontent = document.getElementsByClassName("tabcontent");
   for (i = 0; i < tabcontent.length; i++) {
       tabcontent[i].style.display = "none";
   }

   // Remove active class from all tab links
   tablinks = document.getElementsByClassName("tablinks");
   for (i = 0; i < tablinks.length; i++) {
       tablinks[i].classList.remove("active");
   }

   // Show the selected tab content and mark the corresponding tab link as active
   document.getElementById(cityName).style.display = "block";
   evt.currentTarget.classList.add("active");
}






// button back to top 
window.onscroll = function () {
   scrollFunction()
};

function scrollFunction() {
   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
       document.getElementById("backToTopBtn").style.display = "block";
   } else {
       document.getElementById("backToTopBtn").style.display = "none";
   }
}

function scrollToTop() {
   const scrollToTopBtn = document.documentElement || document.body;
   scrollToTopBtn.scrollIntoView({
       behavior: "smooth"
   });
}


// faq section
document.addEventListener("DOMContentLoaded", function () {
   let accordionButtons = document.querySelectorAll('.accordion-button');
   let acoimg = document.querySelectorAll('.accordion-button img');

   accordionButtons.forEach(function (button, index) {
       button.addEventListener('click', function () {
           let collapse = this.parentElement.nextElementSibling;

           // Close all other accordion items
           accordionButtons.forEach(function (otherButton, otherIndex) {
               if (otherButton !== button) {
                   var otherCollapse = otherButton.parentElement.nextElementSibling;
                   otherCollapse.style.maxHeight = null;
                   // Reset the image source and rotation for other accordion items
                   acoimg[otherIndex].src = 'Images/icon/plus.png';
                   acoimg[otherIndex].style.transform = 'rotate(0deg)';
                   otherButton.style.backgroundColor = '#fff';
               }
           });

           // Toggle the clicked accordion item
           if (collapse.style.maxHeight) {
               collapse.style.maxHeight = null;
               // Reset the image source, rotation, and background color when collapsing
               acoimg[index].src = 'Images/icon/plus.png';
               acoimg[index].style.transform = 'rotate(90deg)';
               button.style.backgroundColor = '';
           } else {
               collapse.style.maxHeight = collapse.scrollHeight + "px";
               // Change the image source, set rotation, and background color when expanding
               acoimg[index].src = 'Images/icon/menus.png';
               acoimg[index].style.transform = 'rotate(180deg)';
               button.style.backgroundColor = '#c1b0d5';
           }
       });
   });
});





// footer validation start
const fom = document.getElementById('footer-form');
const footerMessage = document.getElementById('footer-message');

fom.addEventListener('submit', (event) => {
   event.preventDefault();
   footerMessage.innerHTML = 'Thank You For Joining With Us';
   footerMessage.style.display = 'flex';
   fom.reset();
   setTimeout(() => {
       footerMessage.style.display = 'none';
   }, 3000);
});
// footer validation end

// Search functionality
let searchData = [];

// Initialize search data
function initializeSearchData() {
    searchData = [
        {
            title: "Home Page",
            content: "Transform Your Business with Expert IT Solutions & Professional Training. 15+ Years of Excellence, Enterprise Solutions, Professional Development, Innovative solutions empowering digital transformation",
            url: "index.html",
            category: "Page"
        },
        {
            title: "Training Programs",
            content: "Professional Training Programs. Full Stack Web Development, Python Development, Mobile App Development, Machine Learning & AI, Data Science & Analytics, Cloud Computing, DevOps Engineering, Cybersecurity, Digital Marketing, UI/UX Design",
            url: "training.html",
            category: "Training"
        },
        {
            title: "Expert Trainers",
            content: "Expert Trainers & Industry Leaders. Dr. Sarah Mitchell AI/ML Expert, Michael Chen Full Stack Lead, David Rodriguez Cybersecurity Expert, Emma Thompson UI/UX Director, Professional mentors from top companies",
            url: "trainers.html",
            category: "Team"
        },
        {
            title: "About Us",
            content: "Explore Our Services And Boost Your Online Presence. At Techxdoz, we are leaders in the IT industry with over 15 years of experience delivering innovative, reliable, and scalable solutions",
            url: "index.html#about-section",
            category: "Page"
        },
        {
            title: "Custom Software Development",
            content: "Tailored software solutions built with cutting-edge technologies to streamline business processes, Web Applications, Desktop Software, API Development, custom solutions",
            url: "index.html#service-section",
            category: "Service"
        },
        {
            title: "Web Development & Design",
            content: "Modern responsive websites and web applications, E-commerce Solutions, CMS Development, user experiences, responsive design, modern web technologies",
            url: "index.html#service-section",
            category: "Service"
        },
        {
            title: "Enterprise Solutions",
            content: "Scalable enterprise-grade solutions that integrate seamlessly, ERP Systems, CRM Solutions, System Integration, workflows optimization, business automation",
            url: "index.html#service-section",
            category: "Service"
        },
        {
            title: "Digital Marketing & SEO",
            content: "Data-driven digital marketing strategies, Search Engine Optimization, Social Media Marketing, PPC Advertising, online presence, brand visibility",
            url: "index.html#service-section",
            category: "Service"
        },
        {
            title: "Mobile App Development",
            content: "Native and cross-platform mobile applications, iOS Development, Android Development, React Native, Flutter, mobile solutions, app store deployment",
            url: "index.html#service-section",
            category: "Service"
        },
        {
            title: "Cloud Solutions & DevOps",
            content: "Comprehensive cloud migration and DevOps implementation, CI/CD Pipelines, Infrastructure as Code, AWS, Azure, Kubernetes, Docker, cloud architecture",
            url: "index.html#service-section",
            category: "Service"
        },
        {
            title: "Training & Coaching Programs",
            content: "Professional development programs designed to upskill teams, Corporate Training, Individual Coaching, Certification Programs, skill development",
            url: "training.html",
            category: "Training"
        },
        {
            title: "AI & ML Development",
            content: "Advanced artificial intelligence and machine learning solutions, Custom AI Models, Machine Learning Algorithms, Data Analytics, intelligent automation, AI solutions",
            url: "index.html#service-section",
            category: "Service"
        },
        {
            title: "Full Stack Web Development Course",
            content: "6 months comprehensive full stack course, React, Node.js, MongoDB, Frontend Backend Development, Database Design, modern web development, JavaScript",
            url: "training.html#training-programs",
            category: "Course"
        },
        {
            title: "Python Development Course",
            content: "4 months Python programming course, Django, Flask, data analysis, automation, API Development, Python fundamentals, web frameworks",
            url: "training.html#training-programs",
            category: "Course"
        },
        {
            title: "Mobile App Development Course",
            content: "5 months mobile development course, React Native, Flutter, iOS Android Development, App Store deployment, mobile UI/UX, cross-platform development",
            url: "training.html#training-programs",
            category: "Course"
        },
        {
            title: "Machine Learning & AI Course",
            content: "6 months comprehensive AI ML program, deep learning, neural networks, computer vision, natural language processing, TensorFlow, Python for AI",
            url: "training.html#training-programs",
            category: "Course"
        },
        {
            title: "Data Science & Analytics Course",
            content: "5 months data science course, statistical analysis, data visualization, Python R programming, big data technologies, analytics, data modeling",
            url: "training.html#training-programs",
            category: "Course"
        },
        {
            title: "Big Data Engineering Course",
            content: "4 months big data course, Hadoop ecosystem, Apache Spark, data pipelines, cloud data platforms, data engineering, distributed computing",
            url: "training.html#training-programs",
            category: "Course"
        },
        {
            title: "Cloud Computing Course",
            content: "4 months cloud computing course, AWS Azure fundamentals, cloud architecture, security compliance, certification preparation, cloud migration",
            url: "training.html#training-programs",
            category: "Course"
        },
        {
            title: "DevOps Engineering Course",
            content: "5 months DevOps course, CI/CD pipelines, Docker Kubernetes, infrastructure as code, monitoring logging, automation, deployment strategies",
            url: "training.html#training-programs",
            category: "Course"
        },
        {
            title: "Cybersecurity Course",
            content: "6 months cybersecurity training, ethical hacking, network security, incident response, penetration testing, security compliance, cyber threats",
            url: "training.html#training-programs",
            category: "Course"
        },
        {
            title: "Digital Marketing Mastery Course",
            content: "3 months digital marketing course, SEO SEM, social media marketing, content strategy, analytics reporting, online advertising, brand building",
            url: "training.html#training-programs",
            category: "Course"
        },
        {
            title: "UI/UX Design Course",
            content: "4 months UI UX design course, design principles, prototyping wireframing, user research, design tools mastery, Figma, Adobe XD, user experience",
            url: "training.html#training-programs",
            category: "Course"
        },
        {
            title: "Dr. Sarah Mitchell",
            content: "Senior AI/ML Trainer Research Director, former Google AI Research Scientist, PhD Computer Science, Deep Learning Neural Networks Computer Vision, machine learning expert",
            url: "trainers.html#trainers-team",
            category: "Trainer"
        },
        {
            title: "Michael Chen",
            content: "Full Stack Development Lead, ex-Microsoft Senior Software Engineer, modern web technologies, cloud architecture, agile development, React Node.js AWS",
            url: "trainers.html#trainers-team",
            category: "Trainer"
        },
        {
            title: "David Rodriguez",
            content: "Cybersecurity Expert Ethical Hacker, former FBI Cybersecurity Consultant, CISO Fortune 500, penetration testing, security architecture, CISSP CEH",
            url: "trainers.html#trainers-team",
            category: "Trainer"
        },
        {
            title: "Emma Thompson",
            content: "UI/UX Design Director, former Apple Design Team Lead, Airbnb Senior UX Designer, user-centered design, design systems, product strategy",
            url: "trainers.html#trainers-team",
            category: "Trainer"
        }
    ];
}

// Perform search
function performSearch(query) {
    if (!query || query.trim().length < 2) {
        return [];
    }

    query = query.toLowerCase().trim();
    const results = [];

    searchData.forEach(item => {
        const titleMatch = item.title.toLowerCase().includes(query);
        const contentMatch = item.content.toLowerCase().includes(query);
        const categoryMatch = item.category.toLowerCase().includes(query);

        if (titleMatch || contentMatch || categoryMatch) {
            let relevanceScore = 0;
            
            // Calculate relevance score
            if (titleMatch) relevanceScore += 10;
            if (contentMatch) relevanceScore += 5;
            if (categoryMatch) relevanceScore += 3;
            
            // Boost exact matches
            if (item.title.toLowerCase() === query) relevanceScore += 20;
            
            results.push({
                ...item,
                relevance: relevanceScore,
                matchType: titleMatch ? 'title' : contentMatch ? 'content' : 'category'
            });
        }
    });

    // Sort by relevance
    return results.sort((a, b) => b.relevance - a.relevance);
}

// Display search results
function displaySearchResults(results, query) {
    const searchBar = document.getElementById('search-bar');
    
    // Remove existing results and backdrop
    const existingResults = document.getElementById('search-results');
    if (existingResults) {
        existingResults.remove();
    }
    const existingBackdrop = document.getElementById('search-backdrop');
    if (existingBackdrop) {
        existingBackdrop.remove();
    }
    
    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.id = 'search-backdrop';
    backdrop.className = 'search-backdrop';
    backdrop.onclick = closeSearchResults;
    document.body.appendChild(backdrop);

    if (results.length === 0) {
        const noResults = document.createElement('div');
        noResults.id = 'search-results';
        noResults.className = 'search-results no-results';
        noResults.innerHTML = `
            <div class="search-header">
                <div class="search-header-content">
                    <h3>No Results Found</h3>
                    <p>No results found for "${query}". Try different keywords like "training", "AI", "web development", "courses", etc.</p>
                </div>
                <button class="search-close-btn" onclick="closeSearchResults()">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        `;
        document.body.appendChild(noResults);
        return;
    }

    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'search-results';
    resultsContainer.className = 'search-results';
    
    // Show up to 10 results instead of 8
    const maxResults = Math.min(results.length, 10);
    
    let resultsHTML = `
        <div class="search-header">
            <div class="search-header-content">
                <h3>Search Results</h3>
                <p>Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}" - Showing top ${maxResults}</p>
            </div>
            <button class="search-close-btn" onclick="closeSearchResults()">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
        <div class="search-results-list">
    `;

    results.slice(0, maxResults).forEach((result, index) => {
        const categoryIcon = getCategoryIcon(result.category);
        const truncatedContent = result.content.length > 100 ? 
            result.content.substring(0, 100) + '...' : 
            result.content;
            
        resultsHTML += `
            <div class="search-result-item" onclick="navigateToResult('${result.url}')" data-index="${index}">
                <div class="result-icon">
                    <i class="${categoryIcon}"></i>
                </div>
                <div class="result-content">
                    <h4>${highlightSearchTerm(result.title, query)}</h4>
                    <p>${highlightSearchTerm(truncatedContent, query)}</p>
                    <div class="result-meta">
                        <span class="result-category">${result.category}</span>
                        ${result.relevance ? `<span class="result-relevance">Relevance: ${result.relevance}</span>` : ''}
                    </div>
                </div>
                <div class="result-arrow">
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
            </div>
        `;
    });

    resultsHTML += `</div>`;
    
    // Add "Show more" button if there are more results
    if (results.length > maxResults) {
        resultsHTML += `
            <div class="search-footer">
                <button class="show-more-btn" onclick="showMoreResults('${query}', ${maxResults})">
                    Show ${Math.min(results.length - maxResults, 5)} more results
                </button>
            </div>
        `;
    }
    
    resultsContainer.innerHTML = resultsHTML;
    document.body.appendChild(resultsContainer);
}

// Highlight search terms in results
function highlightSearchTerm(text, query) {
    if (!query || query.length < 2) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Show more results function
function showMoreResults(query, currentCount) {
    const results = performSearch(query);
    displayAllResults(results, query, currentCount + 5);
}

// Display all results (for show more functionality)
function displayAllResults(results, query, maxResults = 15) {
    const searchBar = document.getElementById('search-bar');
    const existingResults = document.getElementById('search-results');
    if (existingResults) {
        existingResults.remove();
    }
    const existingBackdrop = document.getElementById('search-backdrop');
    if (existingBackdrop) {
        existingBackdrop.remove();
    }
    
    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.id = 'search-backdrop';
    backdrop.className = 'search-backdrop';
    backdrop.onclick = closeSearchResults;
    document.body.appendChild(backdrop);

    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'search-results';
    resultsContainer.className = 'search-results';
    
    const showCount = Math.min(results.length, maxResults);
    
    let resultsHTML = `
        <div class="search-header">
            <div class="search-header-content">
                <h3>Search Results</h3>
                <p>Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}" - Showing ${showCount}</p>
            </div>
            <button class="search-close-btn" onclick="closeSearchResults()">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
        <div class="search-results-list">
    `;

    results.slice(0, showCount).forEach((result, index) => {
        const categoryIcon = getCategoryIcon(result.category);
        const truncatedContent = result.content.length > 100 ? 
            result.content.substring(0, 100) + '...' : 
            result.content;
            
        resultsHTML += `
            <div class="search-result-item" onclick="navigateToResult('${result.url}')" data-index="${index}">
                <div class="result-icon">
                    <i class="${categoryIcon}"></i>
                </div>
                <div class="result-content">
                    <h4>${highlightSearchTerm(result.title, query)}</h4>
                    <p>${highlightSearchTerm(truncatedContent, query)}</p>
                    <div class="result-meta">
                        <span class="result-category">${result.category}</span>
                    </div>
                </div>
                <div class="result-arrow">
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
            </div>
        `;
    });

    resultsHTML += `</div>`;
    
    if (results.length > showCount) {
        resultsHTML += `
            <div class="search-footer">
                <button class="show-more-btn" onclick="showMoreResults('${query}', ${showCount})">
                    Show ${Math.min(results.length - showCount, 5)} more results
                </button>
            </div>
        `;
    }
    
    resultsContainer.innerHTML = resultsHTML;
    document.body.appendChild(resultsContainer);
}

// Get category icon
function getCategoryIcon(category) {
    const icons = {
        'Page': 'fa-solid fa-file',
        'Service': 'fa-solid fa-cogs',
        'Training': 'fa-solid fa-graduation-cap',
        'Course': 'fa-solid fa-book',
        'Team': 'fa-solid fa-users',
        'Trainer': 'fa-solid fa-user-tie' // Added Trainer icon
    };
    return icons[category] || 'fa-solid fa-search';
}

// Navigate to search result
function navigateToResult(url) {
    close_search_bar();
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

// Enhanced search bar functionality
function open_search_bar() {
    "use strict";
    const sidepanel = document.getElementById("search-bar");
    if (sidepanel) {
        sidepanel.style.height = "100vh";
        sidepanel.style.borderRadius = "0";
        
        // Initialize search data if not already done
        if (searchData.length === 0) {
            initializeSearchData();
        }
        
        // Focus on search input
        setTimeout(() => {
            const searchInput = sidepanel.querySelector('input[type="search"]');
            if (searchInput) {
                searchInput.focus();
            }
        }, 100);
    } else {
        console.error("Error: Search panel element not found!");
    }
}

function close_search_bar() {
    "use strict";
    const sidepanel = document.getElementById("search-bar");
    if (sidepanel) {
        sidepanel.style.height = "0";
        sidepanel.style.borderTopLeftRadius = "100%";
        sidepanel.style.borderTopRightRadius = "100%";
        
        // Clear search results and backdrop
        const existingResults = document.getElementById('search-results');
        if (existingResults) {
            existingResults.remove();
        }
        const existingBackdrop = document.getElementById('search-backdrop');
        if (existingBackdrop) {
            existingBackdrop.remove();
        }
        
        // Clear search input
        const searchInput = sidepanel.querySelector('input[type="search"]');
        if (searchInput) {
            searchInput.value = '';
        }
    } else {
        console.error("Error: Search panel element not found!");
    }
}

// Close search results only (not the entire search bar)
function closeSearchResults() {
    const existingResults = document.getElementById('search-results');
    if (existingResults) {
        existingResults.remove();
    }
    const existingBackdrop = document.getElementById('search-backdrop');
    if (existingBackdrop) {
        existingBackdrop.remove();
    }
}

// Handle search form submission and real-time search
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('#search-bar form');
    const searchInput = document.querySelector('#search-bar input[type="search"]');
    
    if (searchForm && searchInput) {
        // Handle form submission
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query.length >= 2) {
                const results = performSearch(query);
                displaySearchResults(results, query);
            }
        });
        
        // Handle real-time search (with debounce)
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            
            clearTimeout(searchTimeout);
            
            if (query.length >= 2) {
                searchTimeout = setTimeout(() => {
                    const results = performSearch(query);
                    displaySearchResults(results, query);
                }, 300);
            } else {
                // Clear results if query is too short
                const existingResults = document.getElementById('search-results');
                if (existingResults) {
                    existingResults.remove();
                }
            }
        });
    }
});

//add to  view all services button




// responsive Logoipsum Slider
$('.sliderlogo').slick({
   arrows: false,
   dots: false,
   infinite: false,
   autoplay: false,
   speed: 300,
   slidesToShow: 5,
   slidesToScroll: 1,
   responsive: [{
           breakpoint: 1024,
           settings: {
               slidesToShow: 4,
               slidesToScroll: 1,
               infinite: true,
               dots: false,
           }
       },
       {
           breakpoint: 600,
           settings: {
               slidesToShow: 2,
               slidesToScroll: 1
           }
       },
   ]
});


// responsive team Slider
$('.team-slider').slick({
   arrows: false,
   dots: true,
   infinite: false,
   autoplay: true,
   speed: 300,
   slidesToShow: 4,
   slidesToScroll: 1,
   responsive: [{
           breakpoint: 1024,
           settings: {
               slidesToShow: 3,
               slidesToScroll: 1,
               infinite: true,
               dots: true,
           }
       },
       {
           breakpoint: 600,
           settings: {
               slidesToShow: 2,
               slidesToScroll: 1
           }
       },
       {
           breakpoint: 480,
           settings: {
               slidesToShow: 1,
               slidesToScroll: 1
           }
       }
   ]
});

// Counter Animation for Training Statistics
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Initialize counter animation when training page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the training page
    if (window.location.pathname.includes('training.html') || document.querySelector('.training-stats-redesigned')) {
        // Animate counters when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        const statsSection = document.querySelector('.training-stats-redesigned') || document.querySelector('.training-stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }
});