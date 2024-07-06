import Button from "@/components/atomic/button/Button";
import Dropdown from "@/components/atomic/dropdown/Dropdown";
import InputField from "@/components/atomic/input/InputField";
import Modal from "@/components/atomic/modal/Modal";
import customToast from "@/components/atomic/toast/customToast";
import { User } from "@/lib/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

interface EditUserModalProps {
  user: User;
  onClose: () => void;
}

const schema = yup.object().shape({
  apikey: yup.string().uuid().required(),
  role: yup.string().required(),
  quota: yup.number().optional().min(0),
  used: yup.number().optional().min(0),
});

interface FormValues {
  apikey: string;
  role: string;
  quota?: number;
  used?: number;
}

export default function EditUser({ user, onClose }: EditUserModalProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      apikey: user.apikey,
      role: user.role,
      quota: user.subscription?.totalQuota,
      used: user.subscription?.usedQuota,
    },
  });

  const [loading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch("/api/auth/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id, ...data }),
      });
      if (response.status === 200) {
        customToast.success("User has been updated successfully");
      } else {
        const data = await response.json();
        customToast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-10 gap-8 "
      >
        <p className="text-base font-medium leading-6">Edit User</p>
        <div className="flex gap-6 flex-col">
          <Controller
            control={control}
            name="apikey"
            render={({ field: { onChange, value } }) => (
              <InputField
                label="Api Key"
                type="text"
                id="apikey"
                name="apikey"
                placeholder="Enter User's API Key"
                onChange={onChange}
                value={value}
                error={errors.apikey?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="role"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                id="role"
                label="Role"
                name="role"
                value={value}
                options={[
                  {
                    value: "ADMIN",
                    label: "Admin",
                  },
                  {
                    value: "USER",
                    label: "User",
                  },
                ]}
                onChange={onChange}
                className="!w-full"
              />
            )}
          />

          {user.subscription && (
            <div className="flex gap-4">
              <Controller
                control={control}
                name="quota"
                render={({ field: { onChange, value } }) => (
                  <InputField
                    id="quota"
                    label="Quota"
                    name="quota"
                    type="number"
                    value={value?.toString()}
                    onChange={onChange}
                    error={errors.quota?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="used"
                render={({ field: { onChange, value } }) => (
                  <InputField
                    id="used"
                    label="Used"
                    name="used"
                    type="number"
                    value={value?.toString()}
                    onChange={onChange}
                    error={errors.used?.message}
                  />
                )}
              />
            </div>
          )}

          <Button
            type="submit"
            label={"Update"}
            variant="primary"
            loading={loading}
          />
        </div>
      </form>
    </Modal>
  );
}
