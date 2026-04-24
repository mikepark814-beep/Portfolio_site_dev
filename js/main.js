/* ── Nav: scroll effect & mobile toggle ── */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav__links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ── Hero typing animation ── */
const roles = [
  'Backend Developer',
  'Java / Spring 개발자',
  '서버 & API 설계자',
];
let roleIdx = 0, charIdx = 0, deleting = false;
const typingEl = document.getElementById('typingText');

function type() {
  const current = roles[roleIdx];
  typingEl.textContent = deleting
    ? current.slice(0, charIdx--)
    : current.slice(0, charIdx++);

  let delay = deleting ? 60 : 110;

  if (!deleting && charIdx > current.length) {
    delay = 1800;
    deleting = true;
  } else if (deleting && charIdx < 0) {
    deleting = false;
    charIdx = 0;
    roleIdx = (roleIdx + 1) % roles.length;
    delay = 400;
  }
  setTimeout(type, delay);
}
type();

/* ── Scroll reveal ── */
const revealEls = document.querySelectorAll(
  '.skill-card, .project-card, .about__grid, .contact__form, .section__title'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.12 }
);
revealEls.forEach(el => observer.observe(el));

/* ── Contact form (기본 처리 — 실제 전송은 Formspree 등 연결 필요) ── */
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = '전송 완료! ✓';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '메시지 보내기';
    btn.disabled = false;
    e.target.reset();
  }, 3000);
});
