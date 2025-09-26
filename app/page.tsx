import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BriefcaseIcon, Target, TrendingUp, Award, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Your Dream Job
              <span className="block text-blue-600">Or Perfect Candidate</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect talent with opportunity. Our modern recruitment platform makes hiring
              seamless for companies and job searching effortless for professionals.
            </p>

            <div className="space-x-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/register">Join TalentHub</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </div>

            <div className="mt-12 text-sm text-gray-500">
              Trusted by professionals and companies worldwide
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose TalentHub?</h2>
          <p className="text-xl text-gray-600">Everything you need for successful recruitment</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <BriefcaseIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Smart Job Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Advanced algorithms connect the right candidates with the perfect opportunities,
                saving time for both employers and job seekers.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Talent Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Build and manage your professional profile, showcase your skills,
                and get discovered by top employers in your field.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Target className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Targeted Recruiting</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Reach qualified candidates efficiently with precision targeting
                and comprehensive candidate screening tools.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Clock className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle>Fast & Efficient</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Streamlined application process and quick response times
                mean faster hiring and shorter job search cycles.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Award className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <CardTitle>Quality First</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Verified profiles and comprehensive screening ensure
                high-quality matches for both candidates and employers.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-teal-600 mx-auto mb-4" />
              <CardTitle>Career Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Access career development resources, skill assessments,
                and growth opportunities to advance your professional journey.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get started in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Your Profile</h3>
              <p className="text-gray-600">
                Sign up and build your professional profile with your skills, experience, and career goals.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Matched</h3>
              <p className="text-gray-600">
                Our platform connects you with relevant opportunities or qualified candidates automatically.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Your Journey</h3>
              <p className="text-gray-600">
                Connect, interview, and begin your next career adventure or find your ideal team member.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Transform Your Career?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of professionals who have found their perfect match on TalentHub
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
              <Link href="/register">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Free to join</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Secure platform</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}