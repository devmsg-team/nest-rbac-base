/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : movie

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 27/05/2023 22:14:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for system_resource
-- ----------------------------
DROP TABLE IF EXISTS `system_resource`;
CREATE TABLE `system_resource` (
  `create_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(255) COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '创建人',
  `update_by` varchar(255) COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '更新人',
  `remark` varchar(255) COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '备注',
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '资源id',
  `parent_id` bigint NOT NULL COMMENT '父资源id',
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL COMMENT '资源名称',
  `path` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '资源路径',
  `type` tinyint NOT NULL COMMENT '资源类型(0菜单 1按钮)',
  `icon` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '资源图标',
  `sort` int DEFAULT NULL COMMENT '资源排序',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of system_resource
-- ----------------------------
BEGIN;
INSERT INTO `system_resource` VALUES ('2022-10-22 22:18:22.199603', '2023-03-03 00:48:21.000000', '', '', '333222', 1, 0, '首页', '/dashboard', 0, NULL, NULL);
INSERT INTO `system_resource` VALUES ('2022-10-22 22:18:47.411937', '2022-11-03 23:45:14.000000', '', '', '', 2, 1, '首页-1', '/dashboard/home', 0, NULL, 0);
INSERT INTO `system_resource` VALUES ('2022-10-30 12:38:56.083487', '2023-03-03 00:48:23.000000', '', '', '333111', 5, 0, '系统管理', '/system', 0, NULL, NULL);
INSERT INTO `system_resource` VALUES ('2022-10-30 12:39:17.596802', '2022-10-30 12:40:34.551530', '', '', '', 6, 5, '权限管理', '/system/auth', 0, NULL, 0);
INSERT INTO `system_resource` VALUES ('2022-10-30 12:39:40.210881', '2022-10-30 12:40:34.555010', '', '', '', 7, 6, '用户管理', '/system/auth/user', 0, NULL, 0);
INSERT INTO `system_resource` VALUES ('2022-10-30 12:41:20.551147', '2022-10-30 12:41:20.551147', '', '', '', 8, 6, '角色管理', '/system/auth/role', 0, NULL, 0);
INSERT INTO `system_resource` VALUES ('2022-10-30 12:41:38.638570', '2022-10-30 12:41:38.638570', '', '', '', 9, 6, '资源管理', '/system/auth/resource', 0, NULL, 0);
INSERT INTO `system_resource` VALUES ('2022-11-03 23:48:14.826950', '2022-11-03 23:48:14.826950', '', '', '', 21, 9, '查询', '/system/resource/tree', 1, NULL, 0);
INSERT INTO `system_resource` VALUES ('2022-11-03 23:49:20.342496', '2022-11-03 23:49:38.000000', '', '', '', 22, 9, '修改', '/system/resource/update', 1, NULL, 0);
INSERT INTO `system_resource` VALUES ('2022-11-03 23:50:14.718605', '2022-11-03 23:50:18.000000', '', '', '', 23, 9, '删除', '/system/resource/delete', 1, NULL, 0);
INSERT INTO `system_resource` VALUES ('2022-11-06 14:22:17.530396', '2022-11-06 14:22:24.000000', '', '', '', 25, 7, '查询', '/system/user/list', 1, NULL, 0);
INSERT INTO `system_resource` VALUES ('2022-11-06 14:22:56.205242', '2022-11-06 14:22:56.205242', '', '', '', 26, 7, '添加', '/system/user/add', 1, NULL, 0);
INSERT INTO `system_resource` VALUES ('2022-11-06 14:23:14.243456', '2022-11-06 14:23:14.243456', '', '', '', 27, 7, '修改', '/system/user/update', 1, NULL, 0);
INSERT INTO `system_resource` VALUES ('2022-11-06 14:23:31.263142', '2022-11-06 14:23:31.263142', '', '', '', 28, 7, '删除', '/system/user/delete', 1, NULL, 0);
INSERT INTO `system_resource` VALUES ('2022-11-06 14:25:08.009697', '2022-11-06 14:25:08.009697', '', '', '', 29, 8, '查询', '/system/role/list', 1, NULL, 0);
INSERT INTO `system_resource` VALUES ('2022-11-06 14:25:23.441686', '2022-11-06 14:25:23.441686', '', '', '', 30, 8, '添加', '/system/role/add', 1, NULL, 0);
INSERT INTO `system_resource` VALUES ('2022-11-06 14:26:17.421476', '2022-11-06 14:26:17.421476', '', '', '', 31, 8, '修改', '/system/role/update', 1, NULL, 0);
INSERT INTO `system_resource` VALUES ('2022-11-06 14:26:32.846946', '2022-11-06 14:26:32.846946', '', '', '', 32, 8, '删除', '/system/role/delete', 1, NULL, 0);
INSERT INTO `system_resource` VALUES ('2022-11-06 14:27:31.111339', '2022-11-06 14:27:31.111339', '', '', '', 33, 9, '添加', '/system/resource/add', 1, NULL, 0);
COMMIT;

-- ----------------------------
-- Table structure for system_role
-- ----------------------------
DROP TABLE IF EXISTS `system_role`;
CREATE TABLE `system_role` (
  `create_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(255) COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '创建人',
  `update_by` varchar(255) COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '更新人',
  `remark` varchar(255) COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '备注',
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '角色id',
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of system_role
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for system_role_resource_relation
-- ----------------------------
DROP TABLE IF EXISTS `system_role_resource_relation`;
CREATE TABLE `system_role_resource_relation` (
  `role_id` bigint unsigned NOT NULL,
  `resource_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`resource_id`),
  KEY `IDX_08512ddb48dae43ad3f6173614` (`role_id`),
  KEY `IDX_16a87ab1f4b61c66fbced454a2` (`resource_id`),
  CONSTRAINT `FK_08512ddb48dae43ad3f61736146` FOREIGN KEY (`role_id`) REFERENCES `system_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_16a87ab1f4b61c66fbced454a27` FOREIGN KEY (`resource_id`) REFERENCES `system_resource` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of system_role_resource_relation
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for system_user
-- ----------------------------
DROP TABLE IF EXISTS `system_user`;
CREATE TABLE `system_user` (
  `create_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(255) COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '创建人',
  `update_by` varchar(255) COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '更新人',
  `remark` varchar(255) COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '备注',
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(50) COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  `status` int NOT NULL DEFAULT '0' COMMENT '帐号状态（0正常 1停用）',
  `role_id` bigint unsigned DEFAULT NULL COMMENT '角色id',
  PRIMARY KEY (`id`),
  KEY `FK_0c906829e166b768c60e912617b` (`role_id`),
  CONSTRAINT `FK_0c906829e166b768c60e912617b` FOREIGN KEY (`role_id`) REFERENCES `system_role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of system_user
-- ----------------------------
BEGIN;
INSERT INTO `system_user` VALUES ('2022-11-05 23:23:58.564370', '2023-03-03 00:45:57.000000', '', '', '超级管理员', 1, 'admin', 'U2FsdGVkX1/Vdde2+lOm+2X8vueouZ16B0asKB1Gu7k=', 0, NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
