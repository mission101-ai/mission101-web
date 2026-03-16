import {
  Calendar,
  MapPin,
  User,
  DollarSign,
  Monitor,
  Lightbulb,
  Users,
  FileText,
  ExternalLink,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface EventDetailsProps {
  eventSlug: string;
}

export const EventDetails = ({ eventSlug }: EventDetailsProps) => {
  const { t } = useTranslation();

  const learningPoints = t(`events.${eventSlug}.learningPoints`, { returnObjects: true }) as string[];
  const targetAudience = t(`events.${eventSlug}.targetAudience`, {
    returnObjects: true,
  }) as string[];

  const formatKey = t(`events.${eventSlug}.format`);
  const isOnline = formatKey.toLowerCase().includes('online') || formatKey.toLowerCase().includes('онлайн');

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left column - main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <div>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  {t(`events.${eventSlug}.description`)}
                </p>
              </div>

              {/* Learning points */}
              {learningPoints && learningPoints.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#3a6291] mb-6 flex items-center gap-2">
                    <Lightbulb className="w-6 h-6" />
                    {t('events.details.learningPoints')}
                  </h2>
                  <div className="grid sm:grid-cols-1 gap-4">
                    {learningPoints.map((point, index) => (
                      <div
                        key={index}
                        className="flex gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:border-blue-200"
                      >
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-uzhhorod font-bold text-sm">{index + 1}</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Target audience */}
              {targetAudience && targetAudience.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#3a6291] mb-6 flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    {t('events.details.targetAudience')}
                  </h2>
                  <ul className="space-y-2">
                    {targetAudience.map((audience, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <span className="w-2 h-2 bg-uzhhorod rounded-full" />
                        {audience}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Materials */}
              {t(`events.${eventSlug}.materials.presentation.url`) !== `events.${eventSlug}.materials.presentation.url` && (
                <div>
                  <h2 className="text-2xl font-bold text-[#3a6291] mb-6 flex items-center gap-2">
                    <FileText className="w-6 h-6" />
                    {t('events.details.materials')}
                  </h2>
                  <a
                    href={t(`events.${eventSlug}.materials.presentation.url`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-6 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-xl hover:shadow-xl transition-all duration-300 hover:border-uzhhorod"
                  >
                    <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-uzhhorod transition-colors duration-300">
                      <FileText className="w-7 h-7 text-uzhhorod group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-lg font-semibold text-[#3a6291] mb-1">
                        {t(`events.${eventSlug}.materials.presentation.title`)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {t(`events.${eventSlug}.materials.presentation.description`)}
                      </p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-uzhhorod group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              )}
            </div>

            {/* Right column - sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-4">
                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-uzhhorod" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">{t('events.details.dateTime')}</p>
                      <p className="text-gray-800 font-semibold">
                        {t(`events.${eventSlug}.date`)}
                      </p>
                      <p className="text-gray-600">{t(`events.${eventSlug}.time`)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-uzhhorod" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">{t('events.details.location')}</p>
                      <p className="text-gray-800 font-semibold">
                        {t(`events.${eventSlug}.location.city`)}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {t(`events.${eventSlug}.location.address`)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-uzhhorod" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">{t('events.details.speaker')}</p>
                      <p className="text-gray-800 font-semibold">
                        {t(`events.${eventSlug}.speaker.name`)}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {t(`events.${eventSlug}.speaker.role`)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-6 h-6 text-uzhhorod" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">{t('events.details.price')}</p>
                      <p className="text-gray-800 font-semibold">
                        {t(`events.${eventSlug}.price`)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {isOnline ? (
                        <Monitor className="w-6 h-6 text-uzhhorod" />
                      ) : (
                        <MapPin className="w-6 h-6 text-uzhhorod" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">{t('events.details.format')}</p>
                      <p className="text-gray-800 font-semibold">
                        {t(`events.${eventSlug}.format`)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
