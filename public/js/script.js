// side bar start  

// ============= Loading Screen Functionality =============
let loadingProgress = 0;
let loadingComplete = false;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initLoadingScreen();
    
    // Check if device supports hover (desktop/laptop)
    if (window.matchMedia("(hover: hover)").matches) {
        initCustomCursor();
    }
});

function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressFill = document.querySelector('.progress-fill');
    const percentageDisplay = document.querySelector('.loading-percentage');
    const body = document.body;
    const siteWrapper = document.querySelector('.site-wrapper');
    
    console.log('Initializing loading screen...'); // Debug log
    
    // Ensure loading screen is visible
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
        loadingScreen.style.opacity = '1';
        loadingScreen.style.visibility = 'visible';
        loadingScreen.style.zIndex = '99999';
    }
    
    // Hide site content during loading
    if (siteWrapper) {
        siteWrapper.style.visibility = 'hidden';
        siteWrapper.style.opacity = '0';
    }
    
    // Add loading active class to hide content
    body.classList.add('loading-active');
    body.style.overflow = 'hidden';
    
    // Simulate loading progress
    const loadingInterval = setInterval(() => {
        // Simulate realistic loading increments
        const increment = Math.random() * 8 + 3; // Random increment between 3-11 (slower)
        loadingProgress += increment;
        
        // Slow down as we approach 100%
        if (loadingProgress > 80) {
            loadingProgress += Math.random() * 2 + 1; // Slower increment
        }
        
        // Cap at 95% until everything is actually loaded
        if (loadingProgress > 95 && !loadingComplete) {
            loadingProgress = 95;
        }
        
        // Update progress bar and percentage
        if (progressFill && percentageDisplay) {
            progressFill.style.width = loadingProgress + '%';
            percentageDisplay.textContent = Math.floor(loadingProgress) + '%';
        }
        
        // Complete loading when progress reaches 100%
        if (loadingProgress >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                completeLoading();
            }, 500);
        }
    }, 150);
    
    // Ensure loading completes when page is fully loaded
    window.addEventListener('load', function() {
        loadingComplete = true;
        
        // If progress is still below 100%, complete it
        if (loadingProgress < 100) {
            const finalInterval = setInterval(() => {
                loadingProgress += 2;
                progressFill.style.width = loadingProgress + '%';
                percentageDisplay.textContent = Math.floor(loadingProgress) + '%';
                
                if (loadingProgress >= 100) {
                    clearInterval(finalInterval);
                    setTimeout(() => {
                        completeLoading();
                    }, 300);
                }
            }, 50);
        }
    });
    
    // Minimum loading time of 2 seconds for better UX
    setTimeout(() => {
        loadingComplete = true;
    }, 2000);
}

function completeLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    const body = document.body;
    const siteWrapper = document.querySelector('.site-wrapper');
    
    console.log('Completing loading...'); // Debug log
    
    if (loadingScreen) {
        // Add fade out class
        loadingScreen.classList.add('fade-out');
        
        // Remove loading screen from DOM after animation
        setTimeout(() => {
            if (loadingScreen && loadingScreen.parentNode) {
                loadingScreen.remove();
            }
        }, 800);
    }
    
    // Remove loading active class to show content
    body.classList.remove('loading-active');
    
    // Ensure site wrapper is visible
    if (siteWrapper) {
        siteWrapper.style.visibility = 'visible';
        siteWrapper.style.opacity = '1';
        console.log('Site wrapper made visible'); // Debug log
    }
    
    // Enable scrolling
    body.style.overflow = 'auto';
    
    // Initialize AOS animations after loading
    setTimeout(() => {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 200);
    
    console.log('Loading completed successfully'); // Debug log
}

// ============= Animated Cursor Functionality =============
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
   const backToTopBtn = document.getElementById("backToTopBtn");
   if (backToTopBtn) {
       if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
           backToTopBtn.style.display = "block";
       } else {
           backToTopBtn.style.display = "none";
       }
   }
}

function scrollToTop() {
   document.documentElement.scrollIntoView({
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
        // Check if it's a section link on the current page
        if (url.includes('#') && (url.startsWith('index.html#') || url.startsWith('#'))) {
            // Extract the section ID
            const sectionId = url.split('#')[1];
            const targetSection = document.getElementById(sectionId);
            
            if (targetSection) {
                // If we're not on the index page, navigate there first
                if (!window.location.pathname.includes('index.html') && window.location.pathname !== '/') {
                    window.location.href = url;
                    return;
                }
                
                // Smooth scroll to the section with offset for fixed header
                const headerOffset = 100; // Adjust based on your header height
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Add a brief highlight effect to the target section
                targetSection.style.transition = 'background-color 0.3s ease';
                targetSection.style.backgroundColor = 'rgba(74, 144, 226, 0.1)';
                setTimeout(() => {
                    targetSection.style.backgroundColor = '';
                }, 2000);
            } else {
                // Fallback to regular navigation if section not found
                window.location.href = url;
            }
        } else {
            // For external pages or non-section links
            window.location.href = url;
        }
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

// ============= Chatbot Functionality =============
document.addEventListener('DOMContentLoaded', function() {
    initChatbot();
});

function initChatbot() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotInput = document.getElementById('chatbot-input-field');
    const chatbotMessages = document.getElementById('chatbot-messages');

    // Knowledge base for TechXDoz
    const knowledgeBase = {
        services: {
            keywords: ['service', 'services', 'what do you offer', 'what can you do', 'solutions', 'development', 'design', 'marketing', 'seo', 'enterprise', 'mobile', 'web', 'software', 'custom', 'ai', 'ml', 'machine learning', 'artificial intelligence', 'cloud', 'devops'],
            response: "TechXDoz offers comprehensive IT solutions including:\n\n🔹 Custom Software Development\n🔹 Web Development & Design\n🔹 Enterprise Solutions (ERP, CRM)\n🔹 Digital Marketing & SEO\n🔹 Mobile App Development\n🔹 Cloud Solutions & DevOps\n🔹 AI & ML Development\n🔹 Training & Coaching Programs\n\nWe specialize in delivering innovative, scalable solutions that accelerate business transformation."
        },
        training: {
            keywords: ['training', 'course', 'courses', 'learn', 'education', 'program', 'programs', 'coaching', 'certification', 'skill', 'skills', 'development'],
            response: "Our training programs include:\n\n📚 Full Stack Development\n📚 Mobile App Development\n📚 AI & Machine Learning\n📚 Cybersecurity\n📚 Digital Marketing\n📚 Cloud Technologies\n📚 DevOps\n📚 UI/UX Design\n\nWe offer both corporate training and individual coaching with hands-on projects and industry certification. Visit our Training page for more details!"
        },
        about: {
            keywords: ['about', 'company', 'who are you', 'experience', 'team', 'history', 'techxdoz', 'years'],
            response: "TechXDoz is a leading IT company with over 15 years of experience in the industry. We specialize in:\n\n✅ Innovative technology solutions\n✅ Professional training and development\n✅ Digital transformation services\n✅ Enterprise-grade applications\n\nOur experienced team of professionals is dedicated to helping businesses unlock their full potential through cutting-edge technology and comprehensive training programs."
        },
        contact: {
            keywords: ['contact', 'phone', 'email', 'reach', 'call', 'address', 'location', 'hours', 'support'],
            response: "Get in touch with us:\n\n📞 Phone: +94 774 910 630\n✉️ Email: info@techxdoz.com\n🕒 Office Hours: Always Open\n\nWe're here to help you with any questions about our services or training programs. Feel free to reach out anytime!"
        },
        pricing: {
            keywords: ['price', 'pricing', 'cost', 'fee', 'budget', 'quote', 'estimate', 'how much', 'payment'],
            response: "Our pricing is customized based on your specific requirements and project scope. We offer:\n\n💰 Competitive pricing models\n💰 Flexible payment options\n💰 Custom quotes for projects\n💰 ROI-driven solutions\n\nContact us at +94 774 910 630 or info@techxdoz.com for a detailed quote tailored to your needs."
        },
        technology: {
            keywords: ['technology', 'tech', 'stack', 'framework', 'language', 'platform', 'tools', 'database'],
            response: "We work with cutting-edge technologies including:\n\n🛠️ Frontend: React, Angular, Vue.js, HTML5, CSS3\n🛠️ Backend: Node.js, Python, Java, .NET, PHP\n🛠️ Mobile: React Native, Flutter, iOS, Android\n🛠️ Cloud: AWS, Azure, Google Cloud\n🛠️ Database: MySQL, PostgreSQL, MongoDB\n🛠️ AI/ML: TensorFlow, PyTorch, scikit-learn\n\nWe choose the right technology stack based on your project requirements."
        },
        portfolio: {
            keywords: ['portfolio', 'projects', 'work', 'examples', 'case study', 'clients', 'previous work'],
            response: "Our portfolio showcases diverse projects across:\n\n🎯 Enterprise applications\n🎯 E-commerce platforms\n🎯 Mobile applications\n🎯 Digital marketing campaigns\n🎯 Custom software solutions\n🎯 AI/ML implementations\n\nCheck out our Portfolio section on the website to see examples of our work across different industries."
        },
        process: {
            keywords: ['process', 'workflow', 'methodology', 'approach', 'steps', 'how do you work'],
            response: "Our proven 4-step process:\n\n1️⃣ Make An Appointment - Initial consultation\n2️⃣ Meet Our Team - Get to know our experts\n3️⃣ Get Consultation - Detailed project analysis\n4️⃣ Start Project - Begin development with regular updates\n\nWe follow agile methodologies with continuous communication and iterative delivery."
        }
    };

    // Irrelevant topics that should trigger error messages
    const irrelevantKeywords = [
        'weather', 'sports', 'music', 'movies', 'food', 'cooking', 'recipe',
        'politics', 'news', 'celebrity', 'gossip', 'games', 'entertainment',
        'travel', 'vacation', 'relationship', 'dating', 'health', 'medical',
        'doctor', 'medicine', 'animal', 'pet', 'fashion', 'shopping',
        'car', 'automobile', 'real estate', 'investment', 'stock', 'crypto'
    ];

    // Toggle chatbot window
    chatbotToggle.addEventListener('click', function() {
        chatbotToggle.classList.toggle('active');
        chatbotWindow.classList.toggle('active');
        if (chatbotWindow.classList.contains('active')) {
            setTimeout(() => chatbotInput.focus(), 300);
            // Add bounce animation to toggle when opened
            chatbotToggle.style.animation = 'bounce 0.6s ease';
            setTimeout(() => {
                chatbotToggle.style.animation = '';
            }, 600);
        }
    });

    // Close chatbot window
    chatbotClose.addEventListener('click', function() {
        chatbotToggle.classList.remove('active');
        chatbotWindow.classList.remove('active');
    });

    // Send message on button click
    chatbotSend.addEventListener('click', function() {
        sendMessage();
    });

    // Send message on Enter key press
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;

        // Add user message to chat
        addMessage(message, 'user');
        
        // Clear input
        chatbotInput.value = '';
        
        // Disable send button and add sending animation
        chatbotSend.disabled = true;
        chatbotSend.classList.add('sending');
        
        // Show typing indicator
        showTypingIndicator();
        
        // Process and respond
        setTimeout(() => {
            hideTypingIndicator();
            const response = processMessage(message);
            addMessage(response.text, response.type);
            chatbotSend.disabled = false;
            chatbotSend.classList.remove('sending');
            chatbotInput.focus();
        }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds for realism
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${sender}-message`;
        
        const messageP = document.createElement('p');
        messageP.textContent = text;
        messageDiv.appendChild(messageP);
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'typing-dot';
            typingDiv.appendChild(dot);
        }
        
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    function processMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for irrelevant topics first
        const isIrrelevant = irrelevantKeywords.some(keyword => 
            lowerMessage.includes(keyword)
        );
        
        if (isIrrelevant) {
            return {
                text: "I'm sorry, but I can only assist with questions related to TechXDoz services, training programs, technology solutions, and IT consulting. Please ask me about our web development, mobile apps, digital marketing, training courses, or other IT services.",
                type: 'error'
            };
        }

        // Check knowledge base for relevant responses
        for (const [category, data] of Object.entries(knowledgeBase)) {
            const hasKeyword = data.keywords.some(keyword => 
                lowerMessage.includes(keyword)
            );
            
            if (hasKeyword) {
                return {
                    text: data.response,
                    type: 'bot'
                };
            }
        }

        // Greetings
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || 
            lowerMessage.includes('hey') || lowerMessage.includes('good morning') ||
            lowerMessage.includes('good afternoon') || lowerMessage.includes('good evening')) {
            return {
                text: "Hello! Welcome to TechXDoz. I'm here to help you learn about our IT solutions, training programs, and services. What would you like to know?",
                type: 'bot'
            };
        }

        // Help requests
        if (lowerMessage.includes('help') || lowerMessage.includes('assist')) {
            return {
                text: "I can help you with information about:\n\n• Our IT services and solutions\n• Training programs and courses\n• Company information and experience\n• Contact details and pricing\n• Technology stack and portfolio\n• Our development process\n\nWhat specific information are you looking for?",
                type: 'bot'
            };
        }

        // Default response for unrecognized but potentially relevant queries
        if (lowerMessage.length > 3) {
            return {
                text: "I'm not sure I understand your question completely. Could you please rephrase it or ask about:\n\n• Our services (web development, mobile apps, etc.)\n• Training programs\n• Company information\n• Contact details\n• Pricing information\n\nI'm here to help with TechXDoz-related queries!",
                type: 'bot'
            };
        }

        return {
            text: "Please ask me a question about TechXDoz services, training programs, or how we can help your business grow with technology.",
            type: 'bot'
        };
    }

    // Close chatbot when clicking outside
    document.addEventListener('click', function(e) {
        if (!chatbotToggle.contains(e.target) && 
            !chatbotWindow.contains(e.target) && 
            chatbotWindow.classList.contains('active')) {
            chatbotToggle.classList.remove('active');
            chatbotWindow.classList.remove('active');
        }
    });

    // Add touch support for mobile devices
    if ('ontouchstart' in window) {
        chatbotToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.click();
        });
        
        chatbotSend.addEventListener('touchstart', function(e) {
            e.preventDefault();
            if (!this.disabled) {
                this.click();
            }
        });
    }
}