The first time a test fails for no clear reason, you investigate. By the tenth time, you click retry without thinking.

You have learned how to get past it. So has everyone else on the team. Eventually, when a new engineer asks why the test keeps failing, you give them the same advice someone gave you: “Just run it again.”

It is a small thing, but I think a lot of engineering teams become comfortable this way. A problem stays around long enough to become part of the routine. People learn the workaround, teach it to the next person, and carry on. After a while, fixing it starts to feel less urgent than explaining how to live with it.

I have led teams like this, and I have been part of them too. We were shipping. There was always something more urgent to do. If you had asked us how things were going, we probably would have said, “Fine.”

Then someone new would join and ask a question we had stopped asking ourselves. An outage would expose something we had been meaning to fix. Suddenly, a problem we had lived with for months would get our full attention.

What changed? We already knew the problem existed. Something had made it harder to keep ignoring.

There is an old story about sardines that captures this quite well.

The story goes that fishermen struggled to keep sardines alive during the journey back to shore. One captain supposedly solved the problem by putting a catfish in the tank. The catfish chased the sardines, which kept them moving throughout the journey.

I would treat the fish story as a fable. But the idea behind it, often called the catfish effect, is useful: a new challenge can interrupt habits that have gone unquestioned for a long time.

For engineers, that challenge might be a colleague, a competitor, a customer, or a standard the team has finally decided to enforce. It does not have to involve a crisis. Sometimes it takes seeing someone do a familiar thing better.

China’s electric vehicle market offers a much bigger example.

As Tesla began making cars in Shanghai, industry figures openly discussed its potential “catfish effect.” In January 2020, Cui Dongshu, secretary general of the China Passenger Car Association, said Tesla’s local production would push domestic carmakers to accelerate their technological development. Tesla was becoming a competitor that Chinese manufacturers would have to measure themselves against more directly. [Xinhua](https://www.xinhuanet.com/english/2020-01/18/c_138716153.htm)

You can see that pressure in specific decisions. In January 2023, Tesla cut the prices of its Model 3 and Model Y in China. XPeng subsequently reduced prices on several models, while the Huawei-backed Aito brand also cut prices. A competitor’s decision had changed the market around them. [Reuters](https://www.investing.com/news/stock-market-news/chinas-xpeng-cuts-prices-on-some-models-starting-tuesday-2981258)

BYD competed through its products too. It launched the Seal sedan in 2022 as a rival to the Model 3, then introduced cheaper versions in May 2023. The new starting price was about 18% below the rear-wheel-drive Model 3 in China at the time. Customers had another serious option to compare on price, range, and features. [Reuters](https://finance.yahoo.com/news/chinas-byd-launches-lower-priced-064921084.html)

By 2025, BYD was selling more fully electric vehicles worldwide than Tesla: about 2.26 million against Tesla’s 1.64 million. Those are global figures, and the BYD number excludes its plug-in hybrids. The company that had once been chasing was now setting a pace of its own. [DW](https://amp.dw.com/en/chinas-byd-overtakes-tesla-as-worlds-top-ev-seller/a-75370504)

It would be too neat to give Tesla credit for China’s EV industry. Government support, battery manufacturing, and competition among Chinese companies all mattered. The International Energy Agency identifies competition, falling battery costs, and policy support as important forces behind the market’s growth. [IEA](https://www.iea.org/reports/global-ev-outlook-2024/executive-summary)

What I take from this is that a strong competitor can change what “good enough” means. Once customers have seen another possibility, your existing product has to answer for itself.

Something similar happens inside an engineering team when a new person joins.

They ask why a deployment takes an afternoon. Why a test is skipped. Why three services handle the same customer information differently. Sometimes there are good answers. There may be constraints they have not encountered yet.

But sometimes the answer is simply, “That is how we have always done it.”

Then they open a pull request with a clear explanation, useful tests, and a smaller change than everyone expected. You read it and realise how much easier they have made your job as a reviewer. The next time you open a pull request, you put more care into yours.

No meeting was held about raising standards. You saw a better way to work, and it gave you something concrete to aim for.

I have also watched teams wear that person down. Every suggestion meets “we tried that before” or “you will understand when you have been here longer.” Eventually, they stop asking. The team becomes comfortable again, but it has lost an opportunity to examine itself.

That does not mean every new suggestion deserves to be implemented. It means the team should be able to explain its choices, including to someone who was not there when those choices were made.

An outage can force the same examination, though at a much higher cost.

Payments start failing at two in the morning. Suddenly, everyone is looking closely at systems they have worked around for months. An alert turns out to have been muted. The runbook describes an old setup. A service nobody wanted to touch sits right in the middle of the failure.

After the incident, the work finally gets attention. Alerts are fixed. Tests are added. Someone documents the service.

Then the urgency fades. Feature requests return. The remaining action items slide into the backlog, and the team begins making the same compromises again.

This is why an outage is such an unreliable way to improve engineering. It creates urgency, but urgency wears off. Someone still has to protect the time to finish the work after everyone can log in again.

If you build products that handle money in Nigeria, you may recognise another source of urgency: an email from compliance with a PDF attached.

There is a requirement, a deadline, and a set of questions that suddenly need clear answers. Where is customer identity information stored? Who can access it? Which accounts have been verified? Can someone who left the company still reach production?

A team might spend months agreeing that these things need attention. Then a deadline arrives, and they finally make room for them.

I have seen compliance deadlines produce improvements that ordinary planning never seemed to accommodate. Access gets reviewed. Old credentials are removed. Different parts of the system begin using a consistent source of customer information.

There is something uncomfortable about that. The value of the work was there before the deadline. The deadline changed its priority.

Of course, a team can also respond by producing documents that describe a better system than the one it actually runs. An access review is only useful if someone checks the access. A policy about removing former employees means very little if their accounts still work.

The challenge has helped only if the underlying behaviour changes.

And this is where I think we need to be careful with the catfish metaphor. It is easy for a manager to hear this story and conclude that people need more pressure.

A team already struggling with constant deadlines may need time to recover and fix things properly. An engineer who avoids a fragile service may need support understanding it. A person who has stopped raising concerns may have learned that nobody listens.

You have to understand what is happening before deciding how to respond.

There is also a difference between someone whose work challenges you and someone who makes you afraid to contribute. I can learn from a colleague who asks difficult questions and helps me work through the answers. If every question comes with ridicule, I will eventually stop showing them unfinished work. The team loses the chance to catch mistakes early.

Useful challenges come with a way to respond. If you want better reliability, give people time to improve it. If you want stronger reviews, account for the time it takes to read code carefully. If you want people to question old decisions, be willing to have your own decisions questioned.

Over time, those practices should become ordinary. The test gets fixed because the team expects its tests to be trustworthy. The review is thorough because everyone understands what approval means. Access is removed when someone leaves because that is part of the job.

That is the part of this story I care about most: what happens after the initial push.

You cannot depend on a new hire, an auditor, or a production incident to keep reminding you what good work looks like. At some point, you have to hold yourself to a standard even when nobody is about to check.

So when I ask what is chasing you, I am asking what still challenges your idea of good enough. Whose work makes you examine your own? What feedback reaches you? What problems have you become too familiar with to notice?

You may already know where to start. There is probably something you have explained away more than once. A test you retry. A review you rush. A part of the system you hope nobody asks you about.

The next time you catch yourself saying, “That is just how it works,” stay with it.
