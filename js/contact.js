// Contact Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const charCount = document.getElementById('charCount');
    const messageInput = document.getElementById('message');
    
    if (contactForm && messageInput && charCount) {
        // Character counter for message
        messageInput.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count;
            
            // Update color based on length
            if (count > 1000) {
                charCount.style.color = '#381f1d';
            } else if (count > 800) {
                charCount.style.color = '#f39c12';
            } else {
                charCount.style.color = '';
            }
        });
        
        // Form validation
        const validateForm = () => {
            let isValid = true;
            
            // Clear previous errors
            document.querySelectorAll('.error-message').forEach(error => {
                error.textContent = '';
            });
            
            // Validate name
            const name = document.getElementById('name');
            if (!name.value.trim()) {
                document.getElementById('nameError').textContent = 'Please enter your name';
                isValid = false;
            }
            
            // Validate email
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address';
                isValid = false;
            }
            
            // Validate subject
            const subject = document.getElementById('subject');
            if (!subject.value) {
                document.getElementById('subjectError').textContent = 'Please select a subject';
                isValid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim() || messageInput.value.length < 10) {
                document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
                isValid = false;
            }
            
            return isValid;
        };
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const submitBtn = this.querySelector('.btn-submit');
                const originalText = submitBtn.innerHTML;
                const originalDisabled = submitBtn.disabled;
                
                // Show loading state
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Show success message
                    document.getElementById('successMessage').classList.add('show');
                    
                    // Reset form
                    contactForm.reset();
                    charCount.textContent = '0';
                    
                    // Restore button state
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = originalDisabled;
                    
                    // Scroll to success message
                    document.getElementById('successMessage').scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        document.getElementById('successMessage').classList.remove('show');
                    }, 5000);
                }, 1500);
            }
        });
        
        // Clear errors on input
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                const errorId = this.id + 'Error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.textContent = '';
                }
            });
        });
    }
    
    // FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Close other open FAQs
            document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
                if (otherAnswer !== answer && otherAnswer.classList.contains('show')) {
                    otherAnswer.classList.remove('show');
                    otherAnswer.previousElementSibling.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            this.classList.toggle('active');
            answer.classList.toggle('show');
            
            // Rotate icon
            if (this.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // Availability cards hover effect
    const availabilityItems = document.querySelectorAll('.availability-item');
    availabilityItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});