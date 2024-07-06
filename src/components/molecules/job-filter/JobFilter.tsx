import Button from "@/components/atomic/button/Button";
import InputField from "@/components/atomic/input/InputField";
import Checkbox from "@/components/atomic/checkbox/Checkbox";
import Modal from "@/components/atomic/modal/Modal";
import { Job_Filter } from "@/lib/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

interface FilterModalProps {
  defaultFilter?: Job_Filter;
  open: boolean;
  onClose: (filter?: Job_Filter) => void;
}

const filterSchema = yup.object().shape({
  creationDateStart: yup.date().optional(),
  creationDateEnd: yup.date().optional(),
  upstreamIdFrom: yup.number().integer().optional(),
  upstreamIdTo: yup.number().integer().optional(),
  company: yup.string().optional(),
  title: yup.string().optional(),
  location: yup.string().optional(),
  type: yup.string().optional(),
  city: yup.string().optional(),
  country: yup.string().optional(),
  region: yup.string().optional(),
  hasRemote: yup.boolean().optional(),
  publishedSince: yup.date().optional(),
  publishedUntil: yup.date().optional(),
  experienceLevel: yup.string().optional(),
  language: yup.string().optional(),
  clearenceRequired: yup.boolean().optional(),
  salaryMin: yup.number().optional(),
  salaryMax: yup.number().optional(),
  salaryCurrency: yup.string().optional(),
});

export default function JobFilter({
  defaultFilter,
  open,
  onClose,
}: FilterModalProps) {

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Job_Filter>({
    resolver: yupResolver(filterSchema),
    defaultValues: {
      ...defaultFilter,
    },
  });

  return (
    <Modal isOpen={true} onClose={() => onClose()}>
      <form
        onSubmit={handleSubmit(onClose)}
        onKeyDown={handleKeyDown}
        className="flex flex-col p-10 gap-8 "
      >
        <p className="text-base font-medium leading-6">Search Jobs</p>
        <div className="flex gap-6 flex-col">
          <div className="flex gap-6">
            <Controller
              control={control}
              name="creationDateStart"
              render={({ field: { onChange, value } }) => (
                <InputField
                  id="creationDateStart"
                  label="Creation Date From"
                  name="creationDateStart"
                  type="date"
                  onChange={onChange}
                  error={errors.creationDateStart?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="creationDateEnd"
              render={({ field: { onChange, value } }) => (
                <InputField
                  id="creationDateEnd"
                  label="Creation Date To"
                  name="creationDateEnd"
                  type="date"
                  onChange={onChange}
                  error={errors.creationDateEnd?.message}
                />
              )}
            />
          </div>
          <div className="flex gap-6">
            <Controller
              control={control}
              name="upstreamIdFrom"
              render={({ field: { onChange, value } }) => (
                <InputField
                  label="Upstream ID From"
                  type="number"
                  id="upstreamIdFrom"
                  name="upstreamIdFrom"
                  value={value?.toString()}
                  placeholder="Enter Upstream ID From"
                  onChange={onChange}
                  error={errors.upstreamIdFrom?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="upstreamIdTo"
              render={({ field: { onChange, value } }) => (
                <InputField
                  label="Upstream ID To"
                  type="number"
                  id="upstreamIdTo"
                  name="upstreamIdTo"
                  value={value?.toString()}
                  placeholder="Enter Upstream ID To"
                  onChange={onChange}
                  error={errors.upstreamIdTo?.message}
                />
              )}
            />
          </div>
          <Controller
            control={control}
            name="company"
            render={({ field: { onChange, value } }) => (
              <InputField
                label="Company"
                type="text"
                id="company"
                name="company"
                placeholder="Enter Company"
                onChange={onChange}
                value={value}
                error={errors.company?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <InputField
                label="Title"
                type="text"
                id="title"
                name="title"
                placeholder="Enter Title"
                onChange={onChange}
                value={value}
                error={errors.title?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="location"
            render={({ field: { onChange, value } }) => (
              <InputField
                label="Location"
                type="text"
                id="location"
                name="location"
                placeholder="Enter Location"
                onChange={onChange}
                value={value}
                error={errors.location?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => (
              <InputField
                label="Type"
                type="text"
                id="type"
                name="type"
                placeholder="Enter Type"
                onChange={onChange}
                value={value}
                error={errors.type?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="city"
            render={({ field: { onChange, value } }) => (
              <InputField
                label="City"
                type="text"
                id="city"
                name="city"
                placeholder="Enter City"
                onChange={onChange}
                value={value}
                error={errors.city?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="country"
            render={({ field: { onChange, value } }) => (
              <InputField
                label="Country"
                type="text"
                id="country"
                name="country"
                placeholder="Enter Country"
                onChange={onChange}
                value={value}
                error={errors.country?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="region"
            render={({ field: { onChange, value } }) => (
              <InputField
                label="Region"
                type="text"
                id="region"
                name="region"
                placeholder="Enter Region"
                onChange={onChange}
                value={value}
                error={errors.region?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="hasRemote"
            render={({ field: { onChange, value } }) => (
              <Checkbox
                id="hasRemote"
                label="Remote"
                name="hasRemote"
                checked={value ? true : false}
                onChange={onChange}
                error={errors.hasRemote?.message}
              />
            )}
          />
          <div className="flex gap-6">
            <Controller
              control={control}
              name="publishedSince"
              render={({ field: { onChange, value } }) => (
                <InputField
                  id="publishedSince"
                  label="Published Since"
                  name="publishedSince"
                  type="date"
                  onChange={onChange}
                  error={errors.publishedSince?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="publishedUntil"
              render={({ field: { onChange, value } }) => (
                <InputField
                  id="publishedUntil"
                  label="Published Until"
                  name="publishedUntil"
                  type="date"
                  onChange={onChange}
                  error={errors.publishedUntil?.message}
                />
              )}
            />
          </div>
          <div className="flex gap-6">
            <Controller
              control={control}
              name="experienceLevel"
              render={({ field: { onChange, value } }) => (
                <InputField
                  label="Experience Level"
                  type="text"
                  id="experienceLevel"
                  name="experienceLevel"
                  placeholder="Enter Experience Level"
                  onChange={onChange}
                  value={value}
                  error={errors.experienceLevel?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="language"
              render={({ field: { onChange, value } }) => (
                <InputField
                  label="Language"
                  type="text"
                  id="language"
                  name="language"
                  placeholder="Enter Language"
                  onChange={onChange}
                  value={value}
                  error={errors.language?.message}
                />
              )}
            />
          </div>
          <Controller
            control={control}
            name="clearenceRequired"
            render={({ field: { onChange, value } }) => (
              <Checkbox
                id="clearenceRequired"
                label="Clearence Required"
                name="clearenceRequired"
                checked={value ? true : false}
                onChange={onChange}
                error={errors.clearenceRequired?.message}
              />
            )}
          />
          <div className="flex gap-6">
            <Controller
              control={control}
              name="salaryMin"
              render={({ field: { onChange, value } }) => (
                <InputField
                  id="salaryMin"
                  label="Min Salary"
                  name="salaryMin"
                  type="number"
                  value={value?.toString()}
                  onChange={onChange}
                  error={errors.salaryMin?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="salaryMax"
              render={({ field: { onChange, value } }) => (
                <InputField
                  id="salaryMax"
                  label="Max Salary"
                  name="salaryMax"
                  type="number"
                  value={value?.toString()}
                  onChange={onChange}
                  error={errors.salaryMax?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="salaryCurrency"
              render={({ field: { onChange, value } }) => (
                <InputField
                  id="salaryCurrency"
                  label="Salary Currency"
                  name="salaryCurrency"
                  type="type"
                  value={value}
                  onChange={onChange}
                  error={errors.salaryCurrency?.message}
                />
              )}
            />
          </div>
          <Button type="submit" label={"Apply"} variant="primary" />
        </div>
      </form>
    </Modal>
  );
}
