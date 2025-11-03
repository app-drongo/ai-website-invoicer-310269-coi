'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Receipt, Clock, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  badge: 'Simple Pricing',
  mainTitle: 'Choose Your',
  mainTitleHighlight: 'Invoicing Plan',
  mainDescription:
    'Start invoicing professionally today. No setup fees, no hidden costs. Scale as your business grows with transparent pricing that works for you.',
  billingMonthly: 'Monthly',
  billingAnnual: 'Annual',
  billingAnnualBadge: 'Save 25%',
  plan1Name: 'Starter',
  plan1Description: 'Perfect for freelancers and solo entrepreneurs',
  plan1Price: 'Free',
  plan1CTA: 'Start Free',
  plan1CTAHref: '/',
  plan2Name: 'Professional',
  plan2Description: 'Ideal for growing businesses and small teams',
  plan2Price: '$19',
  plan2Period: '/month',
  plan2Badge: 'Most Popular',
  plan2CTA: 'Start 14-Day Trial',
  plan2CTAHref: '/',
  plan2Trial: '14-day free trial • No credit card required',
  plan3Name: 'Business',
  plan3Description: 'Advanced features for established companies',
  plan3Price: '$49',
  plan3Period: '/month',
  plan3Badge: 'Best Value',
  plan3CTA: 'Start Trial',
  plan3CTAHref: '/',
  bottomTitle: 'Need Enterprise Solutions?',
  bottomDescription:
    'Custom invoicing workflows, dedicated support, and enterprise-grade security for large organizations with complex billing needs.',
  bottomCTA: 'Contact Sales Team',
  bottomCTAHref: '/',
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: config.plan1Name,
      description: config.plan1Description,
      price: config.plan1Price,
      period: '',
      badge: null,
      features: [
        'Up to 5 invoices per month',
        'Basic invoice templates',
        'Email invoice delivery',
        'Payment tracking',
        'Client management',
        'Mobile app access',
      ],
      cta: config.plan1CTA,
      ctaHref: config.plan1CTAHref,
      popular: false,
      icon: Receipt,
    },
    {
      name: config.plan2Name,
      description: config.plan2Description,
      price: billingCycle === 'annual' ? '$15' : config.plan2Price,
      period: config.plan2Period,
      badge: config.plan2Badge,
      features: [
        'Unlimited invoices',
        'Premium templates & branding',
        'Automated payment reminders',
        'Online payment processing',
        'Expense tracking',
        'Financial reporting',
        'Multi-currency support',
        'Priority email support',
      ],
      cta: config.plan2CTA,
      ctaHref: config.plan2CTAHref,
      popular: true,
      icon: Clock,
    },
    {
      name: config.plan3Name,
      description: config.plan3Description,
      price: billingCycle === 'annual' ? '$39' : config.plan3Price,
      period: config.plan3Period,
      badge: config.plan3Badge,
      features: [
        'Everything in Professional',
        'Advanced analytics & insights',
        'Team collaboration tools',
        'API access & integrations',
        'Custom invoice workflows',
        'White-label solutions',
        'Dedicated account manager',
        'Phone & chat support',
      ],
      cta: config.plan3CTA,
      ctaHref: config.plan3CTAHref,
      popular: false,
      icon: Shield,
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.1),transparent_50%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-6 px-4 py-2 border-primary/20">
            <Receipt className="size-3 mr-2" />
            <span data-editable="badge">{config.badge}</span>
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span data-editable="mainTitle">{config.mainTitle}</span>
            <span className="block bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
              <span data-editable="mainTitleHighlight">{config.mainTitleHighlight}</span>
            </span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10">
            <span data-editable="mainDescription">{config.mainDescription}</span>
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center p-1 bg-muted/50 backdrop-blur-sm rounded-xl border border-border/50">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                'px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200',
                billingCycle === 'monthly'
                  ? 'bg-background text-foreground shadow-md border border-border/50'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <span data-editable="billingMonthly">{config.billingMonthly}</span>
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={cn(
                'px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2',
                billingCycle === 'annual'
                  ? 'bg-background text-foreground shadow-md border border-border/50'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <span data-editable="billingAnnual">{config.billingAnnual}</span>
              <Badge
                variant="secondary"
                className="text-xs bg-primary/10 text-primary border-primary/20"
              >
                <span data-editable="billingAnnualBadge">{config.billingAnnualBadge}</span>
              </Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card
                key={index}
                className={cn(
                  'relative overflow-hidden transition-all duration-300 hover:shadow-xl backdrop-blur-sm',
                  plan.popular
                    ? 'border-primary/50 shadow-xl shadow-primary/10 lg:scale-105 bg-card/80'
                    : 'border-border/30 hover:border-primary/30 bg-card/50'
                )}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1.5 shadow-lg border-0">
                      <Star className="size-3 mr-1 fill-current" />
                      <span data-editable="plan2Badge">{plan.badge}</span>
                    </Badge>
                  </div>
                )}

                {/* Background Effects */}
                {plan.popular && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />
                )}

                <CardHeader className={cn('relative text-center pb-8', plan.popular && 'pt-12')}>
                  {/* Plan Icon */}
                  <div
                    className={cn(
                      'size-12 mx-auto mb-4 rounded-xl flex items-center justify-center',
                      plan.popular
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted/50 text-muted-foreground'
                    )}
                  >
                    <IconComponent className="size-6" />
                  </div>

                  {plan.badge && !plan.popular && (
                    <Badge
                      variant="outline"
                      className="mb-4 mx-auto w-fit border-primary/20 text-primary"
                    >
                      <span data-editable="plan3Badge">{plan.badge}</span>
                    </Badge>
                  )}

                  <CardTitle className="text-2xl mb-3">
                    <span data-editable={`plan${index + 1}Name`}>{plan.name}</span>
                  </CardTitle>
                  <CardDescription className="text-base mb-8 leading-relaxed">
                    <span data-editable={`plan${index + 1}Description`}>{plan.description}</span>
                  </CardDescription>

                  <div className="flex items-end justify-center gap-1 mb-2">
                    <span className="text-5xl font-bold">
                      <span data-editable={`plan${index + 1}Price`}>{plan.price}</span>
                    </span>
                    {plan.period && (
                      <span className="text-muted-foreground mb-2 text-lg">
                        <span data-editable={`plan${index + 1}Period`}>{plan.period}</span>
                      </span>
                    )}
                  </div>
                  {billingCycle === 'annual' && plan.period && (
                    <p className="text-sm text-muted-foreground">Billed annually • Save 25%</p>
                  )}
                </CardHeader>

                <CardContent className="relative space-y-8">
                  {/* Features List */}
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div
                          className={cn(
                            'size-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
                            plan.popular
                              ? 'bg-primary/15 text-primary'
                              : 'bg-muted/50 text-muted-foreground'
                          )}
                        >
                          <Check className="size-3" />
                        </div>
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    className={cn(
                      'w-full text-base py-6 font-semibold transition-all duration-200',
                      plan.popular
                        ? 'bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl'
                        : 'border-primary/20 hover:border-primary/40 hover:bg-primary/5'
                    )}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => navigate(plan.ctaHref)}
                    data-editable-href={`plan${index + 1}CTAHref`}
                    data-href={plan.ctaHref}
                  >
                    {plan.popular && <Zap className="size-4 mr-2" />}
                    <span data-editable={`plan${index + 1}CTA`}>{plan.cta}</span>
                  </Button>

                  {plan.name === config.plan2Name && (
                    <p className="text-center text-sm text-muted-foreground">
                      <span data-editable="plan2Trial">{config.plan2Trial}</span>
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-20 max-w-2xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-4">
              <span data-editable="bottomTitle">{config.bottomTitle}</span>
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              <span data-editable="bottomDescription">{config.bottomDescription}</span>
            </p>
            <Button
              variant="outline"
              size="lg"
              className="border-primary/20 hover:border-primary/40 hover:bg-primary/5 px-8 py-6"
              onClick={() => navigate(config.bottomCTAHref)}
              data-editable-href="bottomCTAHref"
              data-href={config.bottomCTAHref}
            >
              <span data-editable="bottomCTA">{config.bottomCTA}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
