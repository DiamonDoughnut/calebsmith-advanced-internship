'use client'
import { useAppDispatch } from "@/hooks/ReduxTSAdapter";
import { openLoginModal } from "@/lib/redux/modalSlice";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiFillAudio, AiFillBulb, AiFillFileText } from "react-icons/ai";
import { BiCrown } from "react-icons/bi";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { RiLeafLine } from "react-icons/ri";

export default function Home() {
  const [hilightedLine, setHilightedLine] = useState(0);
  const dispatch = useAppDispatch()

  useEffect(() => {
    const stringLighting = setInterval(() => {
      setHilightedLine((state) => {
        if (state === 5) {
          return 0;
        }
        return state + 1;
      });
    }, 2000);

    return () => clearInterval(stringLighting);
  }, []);

  return (
    <>
      <nav className='nav'>
        <div className='nav__wrapper'>
          <figure className='nav__img--mask relative'>
            <Image
              fill
              src='/assets/logo.png'
              alt='logo'
            />
          </figure>
          <ul className='list-none nav__list--wrapper'>
            <li className='nav__list nav__list--login' onClick={() => dispatch(openLoginModal())} >Login</li>
            <li className='nav__list nav__list--mobile'>About</li>
            <li className='nav__list nav__list--mobile'>Contact</li>
            <li className='nav__list nav__list--mobile'>Help</li>
          </ul>
        </div>
      </nav>
      <section id='landing'>
        <div className='container'>
          <div className='row'>
            <div className='landing__wrapper'>
              <div className='landing__content'>
                <div className='landing__content__title'>
                  Gain more knowledge <br className='remove--tablet' />
                  in less time
                </div>
                <div className='landing__content__subtitle'>
                  Great summaries for busy people,
                  <br className='remove--tablet' />
                  individuals who barely have time to read,
                  <br className='remove--tablet' />
                  and even people who don’t like to read.
                </div>
                <button className='cursor-pointer outline-0 border-0 bg-transparent active:translate-y-[1px] disabled:cursor-not-allowed opacity-65 btn home__cta--btn' onClick={() => dispatch(openLoginModal())} >Login</button>
              </div>
              <figure className='landing__image--mask'>
                <Image
                  src='/assets/landing.png'
                  width={779}
                  height={740}
                  alt='landing'
                  className="h-100 w-100 max-w-[400px]"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>
      <section id='features'>
        <div className='container'>
          <div className='row'>
            <div className='section__title'>
              Understand books in few minutes
            </div>
            <div className='features__wrapper'>
              <div className='features'>
                <div className='features__icon'>
                  <AiFillFileText />
                </div>
                <div className='features__title'>Read or listen</div>
                <div className='features__sub--title'>
                  Save time by getting the core ideas from the best books.
                </div>
              </div>
              <div className='features'>
                <div className='features__icon'>
                  <AiFillBulb />
                </div>
                <div className='features__title'>Find your next read</div>
                <div className='features__sub--title'>
                  Explore book lists and personalized recommendations.
                </div>
              </div>
              <div className='features'>
                <div className='features__icon'>
                  <AiFillAudio />
                </div>
                <div className='features__title'>Briefcasts</div>
                <div className='features__sub--title'>
                  Gain valuable insights from briefcasts
                </div>
              </div>
            </div>
            <div className='statistics__wrapper'>
              <div className='statistics__content--header'>
                <div
                  className={cn(
                    "statistics__heading",
                    hilightedLine === 0 && "text-green-500"
                  )}
                >
                  Enhance your knowledge
                </div>
                <div
                  className={cn(
                    "statistics__heading",
                    hilightedLine === 1 && "text-green-500"
                  )}
                >
                  Achieve greater success
                </div>
                <div
                  className={cn(
                    "statistics__heading",
                    hilightedLine === 2 && "text-green-500"
                  )}
                >
                  Improve your health
                </div>
                <div
                  className={cn(
                    "statistics__heading",
                    hilightedLine === 3 && "text-green-500"
                  )}
                >
                  Develop better parenting skills
                </div>
                <div
                  className={cn(
                    "statistics__heading",
                    hilightedLine === 4 && "text-green-500"
                  )}
                >
                  Increase happiness
                </div>
                <div
                  className={cn(
                    "statistics__heading",
                    hilightedLine === 5 && "text-green-500"
                  )}
                >
                  Be the best version of yourself!
                </div>
              </div>
              <div className='statistics__content--details'>
                <div className='statistics__data'>
                  <div className='statistics__data--number'>93%</div>
                  <div className='statistics__data--title'>
                    of Summarist members <b>significantly increase</b> reading
                    frequency.
                  </div>
                </div>
                <div className='statistics__data'>
                  <div className='statistics__data--number'>96%</div>
                  <div className='statistics__data--title'>
                    of Summarist members <b>establish better</b> habits.
                  </div>
                </div>
                <div className='statistics__data'>
                  <div className='statistics__data--number'>90%</div>
                  <div className='statistics__data--title'>
                    have made <b>significant positive</b> change to their lives.
                  </div>
                </div>
              </div>
            </div>
            <div className='statistics__wrapper'>
              <div className='statistics__content--details statistics__content--details-second'>
                <div className='statistics__data'>
                  <div className='statistics__data--number'>91%</div>
                  <div className='statistics__data--title'>
                    of Summarist members <b>report feeling more productive</b>
                    after incorporating the service into their daily routine.
                  </div>
                </div>
                <div className='statistics__data'>
                  <div className='statistics__data--number'>94%</div>
                  <div className='statistics__data--title'>
                    of Summarist members have <b>noticed an improvement</b> in
                    their overall comprehension and retention of information.
                  </div>
                </div>
                <div className='statistics__data'>
                  <div className='statistics__data--number'>88%</div>
                  <div className='statistics__data--title'>
                    of Summarist members <b>feel more informed</b> about current
                    events and industry trends since using the platform.
                  </div>
                </div>
              </div>
              <div className='statistics__content--header statistics__content--header-second'>
                <div
                  className={cn(
                    "statistics__heading",
                    hilightedLine === 0 && "text-green-500"
                  )}
                >
                  Expand your learning
                </div>
                <div
                  className={cn(
                    "statistics__heading",
                    hilightedLine === 1 && "text-green-500"
                  )}
                >
                  Accomplish your goals
                </div>
                <div
                  className={cn(
                    "statistics__heading",
                    hilightedLine === 2 && "text-green-500"
                  )}
                >
                  Strengthen your vitality
                </div>
                <div
                  className={cn(
                    "statistics__heading",
                    hilightedLine === 3 && "text-green-500"
                  )}
                >
                  Become a better caregiver
                </div>
                <div
                  className={cn(
                    "statistics__heading",
                    hilightedLine === 4 && "text-green-500"
                  )}
                >
                  Improve your mood
                </div>
                <div
                  className={cn(
                    "statistics__heading",
                    hilightedLine === 5 && "text-green-500"
                  )}
                >
                  Maximize your abilities
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id='reviews'>
        <div className='row'>
          <div className='container'>
            <div className='section__title'>What our members say</div>
            <div className='reviews__wrapper'>
              <div className='review'>
                <div className='review__header'>
                  <div className='review__name'>Hanna M.</div>
                  <div className='review__stars'>
                    <BsStarFill />
                  </div>
                </div>
                <div className='review__body'>
                  This app has been a <b>game-changer</b> for me! It&apos;s
                  saved me so much time and effort in reading and comprehending
                  books. Highly recommend it to all book lovers.
                </div>
              </div>
              <div className='review'>
                <div className='review__header'>
                  <div className='review__name'>David B.</div>
                  <div className='review__stars'>
                    <BsStarFill />
                  </div>
                </div>
                <div className='review__body'>
                  I love this app! It provides
                  <b>concise and accurate summaries</b> of books in a way that
                  is easy to understand. It&apos;s also very user-friendly and
                  intuitive.
                </div>
              </div>
              <div className='review'>
                <div className='review__header'>
                  <div className='review__name'>Nathan S.</div>
                  <div className='review__stars'>
                    <BsStarFill />
                  </div>
                </div>
                <div className='review__body'>
                  This app is a great way to get the main takeaways from a book
                  without having to read the entire thing.
                  <b>The summaries are well-written and informative.</b>
                  Definitely worth downloading.
                </div>
              </div>
              <div className='review'>
                <div className='review__header'>
                  <div className='review__name'>Ryan R.</div>
                  <div className='review__stars'>
                    <BsStarFill />
                  </div>
                </div>
                <div className='review__body'>
                  If you&apos;re a busy person who
                  <b>loves reading but doesn&apos;t have the time</b> to read
                  every book in full, this app is for you! The summaries are
                  thorough and provide a great overview of the book&apos;s
                  content.
                </div>
              </div>
            </div>
            <div className='reviews__btn--wrapper'>
              <button className='cursor-pointer outline-0 border-0 bg-transparent active:translate-y-[1px] disabled:cursor-not-allowed opacity-65 btn home__cta--btn' onClick={() => dispatch(openLoginModal())} >Login</button>
            </div>
          </div>
        </div>
      </section>
      <section id='numbers'>
        <div className='container'>
          <div className='row'>
            <div className='section__title'>
              Start growing with Summarist now
            </div>
            <div className='numbers__wrapper'>
              <div className='numbers'>
                <div className='numbers__icon'>
                  <BiCrown />
                </div>
                <div className='numbers__title'>3 Million</div>
                <div className='numbers__sub--title'>
                  Downloads on all platforms
                </div>
              </div>
              <div className='numbers'>
                <div className='numbers__icon numbers__star--icon'>
                  <BsStarFill />
                  <BsStarHalf />
                </div>
                <div className='numbers__title'>4.5 Stars</div>
                <div className='numbers__sub--title'>
                  Average ratings on iOS and Google Play
                </div>
              </div>
              <div className='numbers'>
                <div className='numbers__icon'>
                  <RiLeafLine />
                </div>
                <div className='numbers__title'>97%</div>
                <div className='numbers__sub--title'>
                  Of Summarist members create a better reading habit
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id='footer'>
        <div className='container'>
          <div className='row'>
            <div className='footer__top--wrapper'>
              <div className='footer__block'>
                <div className='footer__link--title'>Actions</div>
                <div>
                  <div className='footer__link--wrapper'>
                    <a className='color-inherit decoration-0 footer__link'>Summarist Magazine</a>
                  </div>
                  <div className='footer__link--wrapper'>
                    <a className='color-inherit decoration-0 footer__link'>Cancel Subscription</a>
                  </div>
                  <div className='footer__link--wrapper'>
                    <a className='color-inherit decoration-0 footer__link'>Help</a>
                  </div>
                  <div className='footer__link--wrapper'>
                    <a className='color-inherit decoration-0 footer__link'>Contact us</a>
                  </div>
                </div>
              </div>
              <div className='footer__block'>
                <div className='footer__link--title'>Useful Links</div>
                <div>
                  <div className='footer__link--wrapper'>
                    <a className='color-inherit decoration-0 footer__link'>Pricing</a>
                  </div>
                  <div className='footer__link--wrapper'>
                    <a className='color-inherit decoration-0 footer__link'>Summarist Business</a>
                  </div>
                  <div className='footer__link--wrapper'>
                    <a className='color-inherit decoration-0 footer__link'>Gift Cards</a>
                  </div>
                  <div className='footer__link--wrapper'>
                    <a className='color-inherit decoration-0 footer__link'>Authors & Publishers</a>
                  </div>
                </div>
              </div>
              <div className='footer__block'>
                <div className='footer__link--title'>Company</div>
                <div>
                  <div className='footer__link--wrapper'>
                    <a className='color-inherit decoration-0 footer__link'>About</a>
                  </div>
                  <div className='footer__link--wrapper'>
                    <a className='color-inherit decoration-0 footer__link'>Careers</a>
                  </div>
                  <div className='footer__link--wrapper'>
                    <a className='color-inherit decoration-0 footer__link'>Partners</a>
                  </div>
                  <div className='footer__link--wrapper'>
                    <a className='color-inherit decoration-0 footer__link'>Code of Conduct</a>
                  </div>
                </div>
              </div>
              <div className='footer__block'>
                <div className='footer__link--title'>Other</div>
                <div>
                  <div className='footer__link--wrapper'>
                    <a className='color-inherit decoration-0 footer__link'>Sitemap</a>
                  </div>
                  <div className='footer__link--wrapper'>
                    <a className='color-inherit decoration-0 footer__link'>Legal Notice</a>
                  </div>
                  <div className='footer__link--wrapper'>
                    <a className='color-inherit decoration-0 footer__link'>Terms of Service</a>
                  </div>
                  <div className='footer__link--wrapper'>
                    <a className='color-inherit decoration-0 footer__link'>Privacy Policies</a>
                  </div>
                </div>
              </div>
            </div>
            <div className='footer__copyright--wrapper'>
              <div className='footer__copyright'>
                Copyright &copy; 2023 Summarist.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
