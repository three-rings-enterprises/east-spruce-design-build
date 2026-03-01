<?php
/**
 * East Spruce Design Build — Theme Functions v2
 */

function east_spruce_enqueue_assets() {
    wp_enqueue_style(
        'east-spruce-fonts',
        'https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap',
        array(),
        null
    );

    wp_enqueue_style(
        'east-spruce-style',
        get_stylesheet_uri(),
        array( 'east-spruce-fonts' ),
        wp_get_theme()->get( 'Version' )
    );
}
add_action( 'enqueue_block_assets', 'east_spruce_enqueue_assets' );

function east_spruce_register_patterns() {
    register_block_pattern_category(
        'east-spruce',
        array( 'label' => __( 'East Spruce', 'east-spruce' ) )
    );
}
add_action( 'init', 'east_spruce_register_patterns' );

function east_spruce_scripts() {
    ?>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // ── Announcement bar dismiss ──
        var bar = document.querySelector('.announcement-bar');
        if (bar) {
            var closeBtn = document.createElement('button');
            closeBtn.innerHTML = '&times;';
            closeBtn.setAttribute('aria-label', 'Dismiss announcement');
            closeBtn.style.cssText = [
                'position:absolute','right:1rem','top:50%',
                'transform:translateY(-50%)',
                'background:none','border:none','color:white',
                'font-size:1.25rem','line-height:1','cursor:pointer',
                'padding:0','opacity:0.7','transition:opacity 0.2s'
            ].join(';');
            closeBtn.addEventListener('mouseenter', function() { this.style.opacity = '1'; });
            closeBtn.addEventListener('mouseleave', function() { this.style.opacity = '0.7'; });
            closeBtn.addEventListener('click', function() {
                var h = bar.offsetHeight;
                bar.style.transition = 'max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease';
                bar.style.overflow = 'hidden';
                bar.style.maxHeight = h + 'px';
                requestAnimationFrame(function() {
                    bar.style.maxHeight = '0';
                    bar.style.opacity = '0';
                    bar.style.paddingTop = '0';
                    bar.style.paddingBottom = '0';
                    setTimeout(function() { bar.remove(); }, 350);
                });
            });
            bar.style.position = 'relative';
            bar.appendChild(closeBtn);
        }

        // ── Sticky header ──
        var header = document.querySelector('.site-header');
        if (header) {
            window.addEventListener('scroll', function() {
                header.classList.toggle('compact', window.scrollY > 40);
            }, { passive: true });
        }

        // ── Scroll reveal (.reveal → .visible) ──
        var revealEls = document.querySelectorAll('.reveal');
        if (revealEls.length) {
            if (!rm) {
                var rObs = new IntersectionObserver(function(entries) {
                    entries.forEach(function(e) {
                        if (e.isIntersecting) { e.target.classList.add('visible'); rObs.unobserve(e.target); }
                    });
                }, { threshold: 0.07, rootMargin: '0px 0px -32px 0px' });
                revealEls.forEach(function(el) { rObs.observe(el); });
            } else {
                revealEls.forEach(function(el) { el.classList.add('visible'); });
            }
        }

        // ── animate-on-scroll → .is-visible ──
        var scrollEls = document.querySelectorAll('.animate-on-scroll');
        if (scrollEls.length) {
            if (!rm) {
                var sObs = new IntersectionObserver(function(entries) {
                    entries.forEach(function(e) {
                        if (e.isIntersecting) { e.target.classList.add('is-visible'); sObs.unobserve(e.target); }
                    });
                }, { threshold: 0.15 });
                scrollEls.forEach(function(el) { sObs.observe(el); });
            } else {
                scrollEls.forEach(function(el) { el.classList.add('is-visible'); });
            }
        }

        // ── Brand word staggered reveal ──
        var brandWords = document.querySelectorAll('.brand-word');
        if (brandWords.length) {
            if (!rm) {
                var bObs = new IntersectionObserver(function(entries) {
                    entries.forEach(function(e) {
                        if (e.isIntersecting) {
                            brandWords.forEach(function(w) { w.classList.add('visible'); });
                            bObs.disconnect();
                        }
                    });
                }, { threshold: 0.3, rootMargin: '0px 0px -40px 0px' });
                brandWords.forEach(function(w) { bObs.observe(w); });
            } else {
                brandWords.forEach(function(w) { w.classList.add('visible'); });
            }
        }

        // ── Accordion ──
        document.querySelectorAll('.accordion-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var item = btn.closest('.accordion-item');
                if (!item) return;
                var isOpen = item.classList.contains('open');
                document.querySelectorAll('.accordion-item.open').forEach(function(el) { el.classList.remove('open'); });
                if (!isOpen) item.classList.add('open');
            });
        });

        // ── Typewriter ──
        var twEl = document.getElementById('typewriter-text');
        if (twEl) {
            if (rm) { twEl.textContent = 'Real Life.'; return; }
            var words = ['Real Life.', 'Family Life.', 'Real Memories.', 'Simple Living.', 'How You Live.'];
            var idx = 0;
            var charDelay = 70, deleteDelay = 40, pause = 2400, startDelay = 800;

            function typeWord(word, cb) {
                var i = 0;
                (function next() {
                    if (i <= word.length) { twEl.textContent = word.slice(0, i++); setTimeout(next, charDelay); }
                    else if (cb) cb();
                })();
            }
            function deleteWord(cb) {
                var text = twEl.textContent, i = text.length;
                (function next() {
                    if (i >= 0) { twEl.textContent = text.slice(0, i--); setTimeout(next, deleteDelay); }
                    else if (cb) cb();
                })();
            }
            function run() {
                typeWord(words[idx], function() {
                    setTimeout(function() {
                        deleteWord(function() {
                            idx = (idx + 1) % words.length;
                            setTimeout(run, 320);
                        });
                    }, pause);
                });
            }
            setTimeout(run, startDelay);
        }
    });
    </script>
    <?php
}
add_action( 'wp_footer', 'east_spruce_scripts' );
